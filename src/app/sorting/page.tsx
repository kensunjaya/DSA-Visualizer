"use client";
import { useEffect, useState } from "react";
import { SortingBar } from "@/components/sorting-bar";

export default function Home() {
  const [items, setItems] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentBar, setCurrentBar] = useState<number | null>(null);

  const checkSorted = async () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i] > items[i + 1]) {
        setCurrentBar(null);
        return false;
      }
      setCurrentBar(i);
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
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
          await new Promise<void>((resolve) => setTimeout(resolve, 20));
        }
      }
    } while (swapped);
    setIsSorting(false);
    setCurrentBar(null);
    return arrayCopy;
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
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        i++;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    setItems([...arr]);
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    return i;
  };

  const randomize = () => {
    const items = Array.from({ length: 80 }, () => Math.floor(Math.random() * 50 + 1));
    setItems(items);
  }

  useEffect(() => {
    randomize();
  }, []);
  
  return (
    <main className="min-h-screen w-screen p-5">
      <button 
        disabled={isSorting}
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={() => {
          checkSorted();
          bubbleSort(items)

        }}
      >
        Bubble Sort
      </button>
      <button
        disabled={isSorting}
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={() => quickSort(items).then(() => {
          checkSorted();
          setIsSorting(false);
          setCurrentBar(null);
          checkSorted();
        })}
      >
        Quick Sort
      </button>
      <button 
        disabled={isSorting}
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={randomize}
      >
        Randomize
      </button>
      <div className="w-full flex flex-row items-end mt-5 min-h-[51rem]">
      {items.map((item, index) => (
        <SortingBar key={index} value={item} color={currentBar === index ? 'bg-green-600' : 'bg-black'}/>
      ))}
      </div>
    </main>
  );
}