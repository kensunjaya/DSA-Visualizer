"use client";
import { useEffect, useRef, useState } from "react";
import { SortingBar } from "@/components/sorting-bar";
import { FaUndoAlt } from "react-icons/fa";

export default function Home() {
  const [items, setItems] = useState<number[]>([]);
  const [prevItems, setPrevItems] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentBar, setCurrentBar] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);
  const [speed, setSpeed] = useState<string>("8");

  const speedRef = useRef(speed);

  const speedMap: { [key: string]: number } = {
    "0": 3000,
    "1": 2000,
    "2": 1000,
    "3": 500,
    "4": 300,
    "5": 200,
    "6": 100,
    "7": 50,
    "8": 20,
    "9": 10,
    "10": 0,
  }

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const checkSorted = async () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i] > items[i + 1]) {
        setCurrentBar(null);
        return false;
      }
      setCurrentBar(i);
      await new Promise<void>((resolve) => setTimeout(resolve, 5));
    }
    setCurrentBar(null);
  };

  const bubbleSort = async (arr: number[]) => {
    setIsSorting(true);
    let swapped = false;
    const arrayCopy = [...arr];
    do {
      swapped = false;
      for (let i = 0; i < arrayCopy.length - 1; i++) {
        if (arrayCopy[i] > arrayCopy[i + 1]) {
          setCurrentBar(i+1);
          const temp = arrayCopy[i];
          arrayCopy[i] = arrayCopy[i + 1];
          arrayCopy[i + 1] = temp;
          swapped = true;
          setItems([...arrayCopy]);
          await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
        }
      }
    } while (swapped);
    setIsSorting(false);
    setCurrentBar(null);
    return arrayCopy;
  };

  const mergeSort = async (arr: number[], left = 0, right = arr.length - 1): Promise<number[]> => {
    if (left >= right) {
      return [arr[left]];
    }

    const mid = Math.floor((left + right) / 2);
    const leftArr = await mergeSort(arr, left, mid);
    const rightArr = await mergeSort(arr, mid + 1, right);
    return merge(leftArr, rightArr, left, right);
  };

  const merge = async (leftArr: number[], rightArr: number[], left: number, right: number): Promise<number[]> => {
    let sortedArray: number[] = [];
    let i = 0, j = 0;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] < rightArr[j]) {
        sortedArray.push(leftArr[i]);
        setCurrentBar(left + i);
        i++;
      } else {
        sortedArray.push(rightArr[j]);
        setCurrentBar(left + i + j);
        j++;
      }

      await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
      setItems((prevItems) => {
        const newItems = [...prevItems];
        sortedArray.forEach((val, index) => {
          newItems[left + index] = val;
        });
        return newItems;
      });
    }

    while (i < leftArr.length) {
      sortedArray.push(leftArr[i]);
      setCurrentBar(left + i);
      i++;

      await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
      setItems((prevItems) => {
        const newItems = [...prevItems];
        sortedArray.forEach((val, index) => {
          newItems[left + index] = val;
        });
        return newItems;
      });
    }

    while (j < rightArr.length) {
      sortedArray.push(rightArr[j]);
      setCurrentBar(left + i + j);
      j++;

      await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
      setItems((prevItems) => {
        const newItems = [...prevItems];
        sortedArray.forEach((val, index) => {
          newItems[left + index] = val;
        });
        return newItems;
      });
    }

    return sortedArray;
  };

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setItems([...arr]);
      setCurrentBar(i);
      await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async (arr: number[]) => {
    setIsSorting(true);
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setItems([...arr]);
      setCurrentBar(i);
      await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
      await heapify(arr, i, 0);
    }

    setIsSorting(false);
    setCurrentBar(null);
    return arr;
  };

  const quickSort = async (arr: number[], left = 0, right = arr.length - 1) => {
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await Promise.all([
        quickSort(arr, left, pivotIndex - 1),
        quickSort(arr, pivotIndex + 1, right),
      ]);
    }
    return arr;
  };

  const partition = async (arr: number[], left: number, right: number) => {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setItems([...arr]);
        await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speedRef.current]));
        i++;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    setItems([...arr]);
    await new Promise<void>((resolve) => setTimeout(resolve, speedMap[speed]));
    return i;
  };

  const randomize = () => {
    const items = Array.from({ length: 80 }, () => Math.floor(Math.random() * 50 + 1));
    setItems(items);
    setPrevItems([...items]);
    setIsInitialState(true);
  }

  useEffect(() => {
    randomize();
  }, []);
  
  return (
    <main className="min-h-screen w-screen p-5 font-ibm text-secondary">
      <div className="flex flex-row justify-between">
        <button 
          disabled={isSorting}
          className="bg-secondary text-white p-2 border border-secondary hover:shadow-lg transition hover:opacity-80 disabled:opacity-60"
          onClick={async () => {
            if (await checkSorted()) return;
            const start = Date.now();
            setIsInitialState(false);
            bubbleSort(items).then(() => {
              setTimeElapsed((Date.now() - start) / 1000);
              checkSorted();
            });
          }}
        >
          Bubble Sort
        </button>
        <button 
          disabled={isSorting}
          className="bg-secondary text-white p-2 border border-secondary ml-3 hover:shadow-lg transition hover:opacity-80 disabled:opacity-60"
          onClick={async () => {
            if (await checkSorted()) return;
            setIsSorting(true);
            const start = Date.now();
            setIsInitialState(false);
            mergeSort(items).then(() => {
              setTimeElapsed((Date.now() - start) / 1000);
              checkSorted();
              setIsSorting(false);
            });
          }}
        >
          Merge Sort
        </button>
        <button 
          disabled={isSorting}
          className="bg-secondary text-white p-2 border border-secondary ml-3 hover:shadow-lg transition hover:opacity-80 disabled:opacity-60"
          onClick={async () => {
            if (await checkSorted()) return;
            const start = Date.now();
            setIsInitialState(false);
            heapSort(items).then(() => {
              setTimeElapsed((Date.now() - start) / 1000);
              checkSorted();
            });
          }}
        >
          Heap Sort
        </button>
        <button
          disabled={isSorting}
          className="bg-secondary text-white p-2 border border-secondary ml-3 hover:shadow-lg transition hover:opacity-80 disabled:opacity-60"
          onClick={async () => {
            if (await checkSorted()) return;
            const start = Date.now();
            setIsInitialState(false);
            setIsSorting(true);
            quickSort(items).then(() => {
            setIsSorting(false);
            setCurrentBar(null);
            setTimeElapsed((Date.now() - start) / 1000);
            checkSorted();
          })}}
        >
          Quick Sort
        </button>
        
        <button 
          disabled={isSorting}
          className="bg-fourth text-white p-2 border border-third ml-3 hover:shadow-lg transition hover:opacity-80 disabled:opacity-60"
          onClick={() => randomize()}
        >
          Randomize
        </button>
        <button 
          className="items-center ml-3 p-3 hover:opacity-80 hover:cursor-pointer text-lg disabled:opacity-60" 
          onClick={() => {setItems([...prevItems])}}
          disabled={isInitialState || isSorting}
        >
          <FaUndoAlt className="text-secondary" />
        </button>
        <div className="ml-auto w-[15%]">
          <div className="font-semibold">Speed</div>
          <input type="range" min={0} max="10" value={speed} step={1} onChange={(e) => setSpeed(e.target.value)} className="accent-secondary w-full" />
        </div>
      </div>
      <div className="w-full flex flex-row items-end mt-5 h-full min-h-[52rem]">
        {items.map((item, index) => (
          <SortingBar key={index} value={item} color={currentBar === index ? 'bg-third' : 'bg-secondary'}/>
        ))}
      </div>
      {(!isInitialState && isSorting) && <div className="w-full text-center p-3 font-semibold">Sorting...</div>}
      {(!isInitialState && !isSorting) && <div className="w-full text-center p-3 font-semibold">{`Time Elapsed: ${timeElapsed}s`}</div>}
    </main>
  );
}