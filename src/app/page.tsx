"use client";
import { LinkedListNode } from "@/components/linked-list-node";
import { LinkedListNodeProps } from "@/interface/linked-list-interface";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen w-screen p-5 flex font-ibm">
      <button 
        className="hover:opacity-80 hover:shadow-lg p-3 bg-black text-white text-xl w-fit h-fit"
        onClick={() => router.push("/linked-list")}
      >
        Linked List
      </button>
      <button 
        className="hover:opacity-80 hover:shadow-lg p-3 bg-black text-white text-xl w-fit h-fit ml-3"
        onClick={() => router.push("/sorting")}
      >
        Sorting
      </button>
    </main>
  );
}
