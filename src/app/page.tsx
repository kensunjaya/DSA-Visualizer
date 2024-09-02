"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-screen p-5 flex font-ibm text-secondary">
      <div className="flex flex-col items-center w-full justify-center">
        <div className="text-4xl font-press mb-10">VisualBox</div>
        <div className="space-x-10">
          <button 
            className="hover:shadow-xl transition p-5 bg-secondary text-white text-xl w-fit h-fit"
            onClick={() => router.push("/linked-list")}
          >
            <img src="https://algofrus.wordpress.com/wp-content/uploads/2016/08/list.gif" className="w-80 h-auto" alt="Linked List" />
            <div className="mt-3 font-semibold">Linked List</div>
          </button>
          <button 
            className="hover:shadow-xl transition p-5 bg-secondary text-white text-xl w-fit h-fit"
            onClick={() => router.push("/sorting")}
          >
            <img src="https://visualgo.net/img/gif/sorting.gif" className="w-80 h-auto" alt="Linked List" />
            <div className="mt-3 font-semibold">Sorting</div>
          </button>
        </div>
      </div>
    </main>
  );
}
