import { LinkedListNodeProps } from "@/interface/linked-list-interface";
import { useEffect } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";

export const LinkedListNode = ({value, next, index, traversedId, id}: LinkedListNodeProps & {index : number, traversedId: string}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className={`w-fit h-fit border-4 border-black flex min-w-16 text-lg ${traversedId === id && 'bg-yellow-200'}`}>
          <div className="p-3 w-full text-center font-mono">{value}</div>
        </div>
        <IoArrowForwardSharp size={40} />
        {next === null && <div className="w-fit h-fit flex min-w-16 text-lg font-mono">null</div>}
      </div>
      {next === null && <div className="text-lg font-mono mt-2">tail</div>}
      {index === 0 && <div className="text-lg font-mono mt-2">head</div>}
      
    </div>
  )
}