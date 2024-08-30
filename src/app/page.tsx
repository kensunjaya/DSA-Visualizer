"use client";
import { LinkedListNode } from "@/components/linked-list-node";
import { LinkedListNodeProps } from "@/interface/linked-list-interface";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [traversedId, setTraversedId] = useState<string>("");
  const [nodes, setNodes] = useState<LinkedListNodeProps[]>([]);

  const insertTail = () => {
    if (value === "") return;
    const newNode = { value: value, next: null, id: uuidv4() };
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      return;
    }
    nodes[nodes.length - 1].next = newNode.id;
    setNodes([...nodes, newNode]);
    setValue("");
  }

  const insertHead = () => {
    if (value === "") return;
    const newNode = { value: value, next: null, id: uuidv4() } as LinkedListNodeProps;
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      return;
    }
    newNode.next = nodes[0].id;
    setNodes([newNode, ...nodes]);
    setValue("");
  }

  const insertMiddle = () => {
    if (value === "") return;
  
    const newNode = { value: value, next: null, id: uuidv4() };
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      return;
    }
  
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setTraversedId(node.id);
      }, 1000 * index); // Increase delay with each iteration
    });
  };
  return (
    <main className="min-h-screen w-screen p-5">
      <input type="text" className="border-black border p-2 mb-5" value={value} onChange={(e) => {setValue(e.target.value)}}/>
      <button 
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={insertTail}
      >
        InsertTail
      </button>
      <button 
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={insertHead}
      >
        InsertHead
      </button>
      <button 
        className="bg-black text-white p-2 border border-black ml-3 hover:shadow-lg transition hover:opacity-80"
        onClick={insertMiddle}
      >
        Insert Middle
      </button>
      <div className="flex flex-row">
      {nodes.map((node, index) => (
        <LinkedListNode key={index} value={node.value} id={node.id} next={node.next} index={index} traversedId={traversedId} />
      ))}
      </div>
    </main>
  );
}
