"use client";
import React, { useEffect, useRef, useState } from 'react';
import { TreeNode } from '@/components/tree-node';

interface Tree {
  value: number;
  x: number;
  y: number;
  left?: Tree;
  right?: Tree;
  height: number;
}

interface Edge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");
  const [treeArray, setTreeArray] = useState<Tree[]>([]);
  const [root, setRoot] = useState<Tree | undefined>(undefined);
  const [edges, setEdges] = useState<Edge[]>([]);

  let tempTree: Tree[] = [];
  let tempEdges: Edge[] = [];
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
      right: undefined,
      height: 1,
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

  const getHeight = (node: Tree | undefined) => {
    if (node === null || node === undefined) {
      return 0;
    }
    return node.height;
  }

  const getBalance = (node: Tree | undefined) => {
    if (node === null || node === undefined) {
      return 0;
    }
    return getHeight(node.left) - getHeight(node.right);
  }
  
  const reposition = (node: Tree | undefined, mode: "decrease" | "increase") => {
    if (node === null || node === undefined) {
      return;
    }
    reposition(node.left, mode);
    if (mode === "decrease") {
      node.x -= 100;
    }
    else {
      node.x += 100;
    }
    reposition(node.right, mode);
  }

  const createEdge = (node: Tree | undefined) => {
    if (node === null || node === undefined) {
      return;
    }
    createEdge(node.left);
    if (node.left) {
      const edge: Edge = {
        x1: node.x,
        y1: node.y,
        x2: node.left.x,
        y2: node.left.y,
      }
      tempEdges.push(edge);
    }
    if (node.right) {
      const edge: Edge = {
        x1: node.x,
        y1: node.y,
        x2: node.right.x,
        y2: node.right.y,
      }
      tempEdges.push(edge);
    }
    createEdge(node.right);
  }

  const getRightHeight = (node: Tree | undefined, height: number) => {
    if (node === null || node === undefined) {
      return height;
    }
    getRightHeight(node.right, height + 1);
  }

  const getLeftHeight = (node: Tree | undefined, height: number) => {
    if (node === null || node === undefined) {
      return height;
    }
    getLeftHeight(node.left, height + 1);
  }

  const alreadyRepositioned = (node: Tree | undefined, mode: "left" | "right") => {
    if (node === null || node === undefined) return true;
    if (mode === "left") {
      if (node.x === node.left?.x! + getRightHeight(node.left, 0)!*100) {
        return true;
      }
      return false;
    }
    else {
      if (node.x === node.right?.x! - getLeftHeight(node.right, 0)!*100) {
        return true;
      }
      return false;
    }
  }

  const insert = (node: Tree | undefined, value: number, prevNode?: Tree, mode?: "left" | "right"): Tree | undefined => {
    if (node === null || node === undefined) {
      console.log("Creating root node");
      console.log("verticalDepth: ", verticalDepth, "horizontalDepth: ", horizontalDepth);
      let newNode;
      if (prevNode) {
        if (mode === "left") {
          newNode = createNode(value, prevNode.x - 100, prevNode.y + 100);
        }
        else {
          newNode = createNode(value, prevNode.x + 100, prevNode.y + 100);
        }
      }
      else {
        newNode = createNode(value, screen.width / 2, 100);
      }
      verticalDepth = horizontalDepth = 0;
      return newNode;
    }
    else if (value < node.value) {
      console.log("inserting to left subtree");
      verticalDepth++;
      horizontalDepth--;
      node.left = insert(node.left, value, node, "left");
    }
    else if (value > node.value) {
      console.log("inserting to right subtree");
      verticalDepth++
      horizontalDepth++;
      node.right = insert(node.right, value, node, "right");
    }
    else {
      return node;
    }
    
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

    const balance = getBalance(node);

    // left left case
    if (balance > 1 && getBalance(node.left) >= 0) {
      
    }

    // left right case
    if (balance > 1 && getBalance(node.left) < 0) {
      if (!alreadyRepositioned(node, "left")) {
        reposition(node.left, "decrease");
      }
    }

    // right right case
    if (balance < -1 && getBalance(node.right) <= 0) {

      
    }

    // right left case
    if (balance < -1 && getBalance(node.right) > 0) {
      if (!alreadyRepositioned(node, "right")) {
        reposition(node.right, "increase");
      }
    }

    return node;
  }

  const addNode = () => {
    tempEdges = [];
    tempTree = [];
    const newNode = insert(root, parseInt(value));
    if (newNode) {
      setRoot(newNode);
      createEdge(newNode);
      convertToArray(newNode);
      setTreeArray([...tempTree]);
      setEdges([...tempEdges]);
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
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-[0]">
        {edges.map((edge, index) => (
          <line 
            key={index}
            x1={edge.x1 + 40} 
            y1={edge.y1 + 40} 
            x2={edge.x2 + 40} 
            y2={edge.y2 + 40} 
            stroke="#815854" 
            strokeWidth="4" 
          />
        ))}
        </svg>
      </div>
    </main>
  );
}