import { useState, useEffect } from "react";

interface SortingBarProps {
  value: number;
  color: string;
  useBorder: boolean;
  initialState: boolean;
}

export const SortingBar = ({ value, color, useBorder, initialState }: SortingBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState("0vh");

  useEffect(() => {
    if (initialState) {
      setHeight(`${value*1.5}vh`);
    }
  }, [value, initialState]);

  return (
    <div className="flex flex-col w-full text-center font-semibold">
      {isHovered && <div className="text-secondary">{value}</div>}
      <div
        style={{ height: initialState ? height : `${value*1.5}vh` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full ${useBorder && 'border border-primary'} ${color} ${
          initialState && 'transition-height duration-500 ease-in-out'
        } hover:opacity-80`}
      >
        <div className="bg-secondary" />
      </div>
    </div>
  );
};
