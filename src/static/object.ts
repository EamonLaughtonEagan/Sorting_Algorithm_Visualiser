import { bubbleSort, cocktailShakerSort, heapSort, insertionSort, mergeSort, quickSort, radixSort, selectionSort, shellSort } from "../components/SortingFunctions";

export const algorithms = [
  {
    name: 'Bubble_Sort',
    sortingFn: bubbleSort,
    description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: 'O(n^2)'
  },
  {
    name: 'Selection_Sort',
    sortingFn: selectionSort,
    description: 'Selection sort is a simple sorting algorithm that selects the smallest element from an unsorted list in each iteration and places that element at the beginning of the unsorted list.',
    complexity: 'O(n^2)',
  },
  {
    name: 'Insertion_Sort',
    sortingFn: insertionSort,
    description: 'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time.',
    complexity: 'O(n^2)',
  },
  {
    name: 'Merge_Sort',
    sortingFn: mergeSort,
    description: 'Merge sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
    complexity: 'O(nlogn)',
  },
  {
    name: 'Quick_Sort',
    sortingFn: quickSort,
    description: 'Quick sort is a divide and conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot.',
    complexity: 'O(nlogn)',
  },
  {
    name: 'Heap_Sort',
    sortingFn: heapSort,
    description: 'Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure.',
    complexity: 'O(nlogn)',
  },
  {
    name: 'Radix_Sort',
    sortingFn: radixSort,
    description: 'Radix sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value.',
    complexity: 'O(nk)',
  },
  {
    name: 'Shell_Sort',
    sortingFn: shellSort,
    description: 'Shell sort is a highly efficient sorting algorithm and is based on insertion sort algorithm.',
    complexity: 'O(nlogn)',
  },
  {
    name: 'Cocktail_Shaker_Sort',
    sortingFn: cocktailShakerSort,
    description: 'Cocktail shaker sort is a variation of bubble sort that is both a stable sorting algorithm and a comparison sort.',
    complexity: 'O(n^2)',
  }
]