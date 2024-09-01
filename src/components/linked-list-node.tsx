import { LinkedListNodeProps } from "@/interface/linked-list-interface";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";

export const LinkedListNode = ({value, next, index, traversedId, id, mode, newNodeValue, insertedIndex}: LinkedListNodeProps & {index : number, traversedId: string, mode: string, newNodeValue: string, insertedIndex: number | null}) => {
  
  return (
    <>
    {traversedId === id ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "linear",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
    >
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className={`w-fit h-fit border-4 border-secondary flex min-w-16 text-lg ${traversedId === id && 'bg-third text-white'}`}>
          <div className="p-3 w-full text-center font-mono">{value}</div>
        </div>
        <IoArrowForwardSharp size={40} />
        {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
      </div>
      {next === null && <div className="text-lg font-mono mt-2">tail</div>}
      {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
      {mode === "insertMiddle" && (
        <div className="text-gray-400 mt-5 border-2 w-fit h-fit border-gray-400 min-w-16 text-lg">
          <div className="p-3 w-full text-center font-mono">{newNodeValue}</div>
        </div>
      )}
    </div>
    </motion.div>
    ) : (
    (mode === "insertHead" && (
      <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "linear",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
      >
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className={`w-fit h-fit border-4 border-secondary flex min-w-16 text-lg ${traversedId === id && 'bg-yellow-200'}`}>
            <div className="p-3 w-full text-center font-mono">{value}</div>
          </div>
          <IoArrowForwardSharp size={40} />
          {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
        </div>
        {next === null && <div className="text-lg font-mono mt-2">tail</div>}
        {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
      </div>
      </motion.div>
    )) ||
    (mode === "insertTail" && (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className={`w-fit h-fit border-4 border-secondary flex min-w-16 text-lg ${traversedId === id && 'bg-yellow-200'}`}>
          <div className="p-3 w-full text-center font-mono">{value}</div>
        </div>
        <IoArrowForwardSharp size={40} />
        {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
      </div>
      {next === null && <div className="text-lg font-mono mt-2">tail</div>}
      {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
    </div>
    )) ||
    (mode === "insertMiddle" && (
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className={`w-fit h-fit border-4 border-secondary flex min-w-16 text-lg ${traversedId === id && 'bg-yellow-200'}`}>
            <div className="p-3 w-full text-center font-mono">{value}</div>
          </div>
          <IoArrowForwardSharp size={40} />
          {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
        </div>
        {next === null && <div className="text-lg font-mono mt-2">tail</div>}
        {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
        {insertedIndex}
      </div>
    )) ||
    (mode === "" && (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className={`w-fit h-fit border-4 border-secondary flex min-w-16 text-lg ${traversedId === id && 'bg-yellow-200'}`}>
          <div className="p-3 w-full text-center font-mono">{value}</div>
        </div>
        <IoArrowForwardSharp size={40} />
        {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
      </div>
      {next === null && <div className="text-lg font-mono mt-2">tail</div>}
      {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
    </div>
    ))

  )}
  </>
  )
} 