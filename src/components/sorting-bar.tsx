import { useState } from "react";

interface SortingBarProps {
  value: number;
  color: string;
  useBorder: boolean;
}

export const SortingBar = ({ value, color, useBorder }: SortingBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col w-full text-center font-semibold">
      {isHovered && <div className="text-secondary">{value}</div>}
      <div style={{ height: `${value}rem` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`w-full ${useBorder && 'border border-primary'} ${color} hover:opacity-80`}>
        <div className="bg-secondary" />
      </div>
    </div>
  );
};
