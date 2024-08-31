"use client";
import { LinkedListNode } from "@/components/linked-list-node";
import { LinkedListNodeProps } from "@/interface/linked-list-interface";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [traversedId, setTraversedId] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [nodes, setNodes] = useState<LinkedListNodeProps[]>([]);

  const insertTail = () => {
    if (value === "") return;
    setMode("insertTail");
    const newNode = { value: value, next: null, id: uuidv4() };
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      setTimeout(() => {
        setTraversedId("");
        setMode("");
      }, 1000);
      setTraversedId(newNode.id);
      return;
    }
    nodes[nodes.length - 1].next = newNode.id;
    setNodes([...nodes, newNode]);
    setValue("");
    setTimeout(() => {
      setTraversedId("");
      setMode("");
    }, 1000);
    setTraversedId(newNode.id);
  }

  const insertHead = () => {
    if (value === "") return;
    setMode("insertHead");
    const newNode = { value: value, next: null, id: uuidv4() } as LinkedListNodeProps;
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      setTimeout(() => {
        setTraversedId("");
        setMode("");
      }, 1000);
      setTraversedId(newNode.id);
      return;
    }
    newNode.next = nodes[0].id;

    setNodes([newNode, ...nodes]);
    setValue("");
    setTimeout(() => {
      setTraversedId("");
      setMode("");
    }, 1000);
    setTraversedId(newNode.id);
  }

  const insertMiddle = async () => {
    if (value === "") return;
    setTraversedId("");
    setMode("insertMiddle");
    const newNode = { value: value, next: null, id: uuidv4() } as LinkedListNodeProps;
  
    if (nodes.length === 0) {
      setNodes([newNode]);
      setValue("");
      setTimeout(() => {
        setTraversedId("");
        setMode("");
      }, 1000);
      setTraversedId(newNode.id);
      return;
    }
  
    if (parseFloat(newNode.value) <= parseFloat(nodes[0].value)) {
      console.log("insertHead");
      insertHead();
      return;
    } else if (parseFloat(newNode.value) >= parseFloat(nodes[nodes.length - 1].value)) {
      console.log("insertTail");
      insertTail();
      return;
    } else {
      let index = 0;
      while (nodes[index].next !== null && parseFloat(newNode.value) > parseFloat(nodes[index].value)) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setTraversedId(nodes[index].id);
            resolve();
            index++;
          }, 1000); // Increase delay with each iteration
        });
      }
  
      // Once traversal is complete, update the nodes
      nodes[index - 1].next = newNode.id;
      newNode.next = nodes[index].id;
      setNodes([...nodes.slice(0, index), newNode, ...nodes.slice(index)]);
      setValue("");
      setTraversedId("");
    }
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
        <LinkedListNode key={index} value={node.value} id={node.id} next={node.next} index={index} traversedId={traversedId} mode={mode} />
      ))}
      </div>
    </main>
  );
}
