"use client";
import React, { useEffect, useRef, useState } from 'react';
import { TreeNode } from '@/components/tree-node';

interface Tree {
  value: number;
  x: number;
  y: number;
  left?: Tree;
  right?: Tree;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");
  const [treeArray, setTreeArray] = useState<Tree[]>([]);
  const [root, setRoot] = useState<Tree | undefined>(undefined);
  let tempTree: Tree[] = [];
  let verticalDepth = 0;
  let horizontalDepth = 0;

  useEffect(() => {

  }, []);

  const createNode = (value: number, x: number, y: number) => {
    const newNode: Tree = {
      value,
      x: x,
      y: y,
      left: undefined,
      right: undefined
    }
    return newNode;
  }

  const convertToArray = (node: Tree | undefined) => {
    if (node === null || node === undefined) {
      return;
    }
    tempTree.push(node);
    convertToArray(node.left);
    convertToArray(node.right);
  }

  const insert = (node: Tree | undefined, value: number): Tree | undefined => {
    if (node === null || node === undefined) {
      console.log("Creating root node");
      console.log("verticalDepth: ", verticalDepth, "horizontalDepth: ", horizontalDepth);
      const newNode = createNode(value, (screen.width / 2) + horizontalDepth*100, verticalDepth*100);
      verticalDepth = horizontalDepth = 0;
      return newNode;
    }
    else if (value < node.value) {
      console.log("entering left subtree")
      verticalDepth++;
      horizontalDepth--;
      node.left = insert(node.left, value);
    }
    else {
      console.log("entering right subtree")
      verticalDepth++
      horizontalDepth++;
      node.right = insert(node.right, value);
    }
    return node;
  }

  const addNode = () => {
    const newNode = insert(root, parseInt(value));
    console.log(newNode);
    if (newNode) {
      setRoot(newNode);
      convertToArray(newNode);
      setTreeArray([...tempTree]);
      console.log("Tree: ", treeArray);
    }
    setValue("");
  }

  return (
    <main className="w-screen min-h-screen p-5 font-play">
      <input type="text" value={value} className="h-full mr-5 p-2" onChange={(e) => setValue(e.target.value)}/>
      <button className="w-fit h-fit p-2 bg-secondary text-white transition hover:opacity-80" onClick={() => addNode()}>Insert</button>
      <div ref={containerRef} className="w-full h-full flex flex-col items-center relative">
        {treeArray.map((node, index) => (
          <TreeNode key={index} value={node.value} x={node.x} y={node.y} />
        ))}
        {/* <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <line 
            x1={lineCoordinates.x1} 
            y1={lineCoordinates.y1} 
            x2={lineCoordinates.x2} 
            y2={lineCoordinates.y2} 
            stroke="black" 
            strokeWidth="2" 
          />
        </svg> */}
      </div>
    </main>
  );
}