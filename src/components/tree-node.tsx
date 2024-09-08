import React from 'react'

interface TreeNodeProps {
  value: number;
  className?: string;
  x: number;
  y: number;
}

export const TreeNode = React.forwardRef<HTMLDivElement, TreeNodeProps>(({ value, className, x, y }, ref) => {
  return (
    <div ref={ref} style={{left: `${x}px`, top: `${y}px`}} className={`${className} rounded-full p-5 font-play absolute border-4 text-secondary font-semibold bg-primary border-secondary flex w-fit h-fit min-w-20 min-h-20 items-center justify-center text-lg`}>
      {value}
    </div>
  )
});

TreeNode.displayName = 'TreeNode';
