
export type SortFunction = (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>,
) => Promise<void>

export const bubbleSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setCurrentIndex(j) // highlight current index
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await new Promise(res => setTimeout(res, 10)); // delay
      }
    }
  }
  setCurrentIndex(null) // clear after sorting
}

export const selectionSort: SortFunction = async (arr, setArray, setCurrentIndex) => {
  const copy = [...arr];
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < copy.length; i++) {
    let minIndex = i;
    setCurrentIndex(minIndex); // highlight min

    for (let j = i + 1; j < copy.length; j++) {
      setCurrentIndex(j); // highlight what we’re comparing
      await delay(10);

      if (copy[j] < copy[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
      setArray([...copy]);
      await delay(10);
    }
  }

  setCurrentIndex(null); // clear highlight after done
}

export const insertionSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Highlight the element being inserted
    setCurrentIndex(i);
    await delay(10);

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      setArray([...arr]);
      setCurrentIndex(j + 1);
      await delay(10);
    }

    arr[j + 1] = key;
    setArray([...arr]);
    setCurrentIndex(j + 1);
    await delay(10);
  }
  setCurrentIndex(null); // Clear
}

export const mergeSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      setCurrentIndex(k); // highlight merge index
      await delay(10);

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }

      setArray([...arr]);
    }

    while (i < left.length) {
      setCurrentIndex(k);
      arr[k++] = left[i++];
      setArray([...arr]);
      await delay(10);
    }

    while (j < right.length) {
      setCurrentIndex(k);
      arr[k++] = right[j++];
      setArray([...arr]);
      await delay(10);
    }
  };

  const mergeSortRecursive = async (arr: number[], start: number, end: number) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortRecursive(arr, start, mid);
    await mergeSortRecursive(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const arrCopy = [...array];
  await mergeSortRecursive(arrCopy, 0, arrCopy.length - 1);
  setCurrentIndex(null); // clear highlight
};

export const quickSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];

  const partition = async (low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setCurrentIndex(j);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise(res => setTimeout(res, 10));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  const sort = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  };

  await sort(0, arr.length - 1);
  setCurrentIndex(null);
};

export const heapSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];

  const heapify = async (n: number, i: number) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      setCurrentIndex(i);
      await new Promise(res => setTimeout(res, 10));
      await heapify(n, largest);
    }
  };

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setArray([...arr]);
    await new Promise(res => setTimeout(res, 10));
    await heapify(i, 0);
  }

  setCurrentIndex(null);
};

export const radixSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  let arr = [...array];

  const getMaxDigits = (nums: number[]) => {
    return Math.floor(Math.log10(Math.max(...nums))) + 1;
  };

  const getDigit = (num: number, place: number) => {
    return Math.floor(num / Math.pow(10, place)) % 10;
  };

  const maxDigits = getMaxDigits(arr);

  for (let k = 0; k < maxDigits; k++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      setCurrentIndex(i);
      buckets[digit].push(arr[i]);
      await new Promise(res => setTimeout(res, 10));
    }

    arr = ([] as number[]).concat(...buckets);
    setArray([...arr]);
  }

  setCurrentIndex(null);
};


export const shellSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        setCurrentIndex(j);
        arr[j] = arr[j - gap];
        j -= gap;
        setArray([...arr]);
        await new Promise(res => setTimeout(res, 10));
      }
      arr[j] = temp;
      setArray([...arr]);
    }
  }
  setCurrentIndex(null);
};

export const cocktailShakerSort: SortFunction = async (array, setArray, setCurrentIndex) => {
  const arr = [...array];
  let swapped = true;
  let start = 0;
  let end = arr.length;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; ++i) {
      setCurrentIndex(i);
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        setArray([...arr]);
        swapped = true;
        await new Promise(res => setTimeout(res, 10));
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; --i) {
      setCurrentIndex(i);
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        setArray([...arr]);
        swapped = true;
        await new Promise(res => setTimeout(res, 10));
      }
    }
    start++;
  }
  setCurrentIndex(null);
};
