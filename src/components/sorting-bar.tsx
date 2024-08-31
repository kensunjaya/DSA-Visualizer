interface SortingBarProps {
  value: number;
  color: string;
}

export const SortingBar = ({ value, color }: SortingBarProps) => {
  return (
    <div style={{ height: `${value}rem` }} className={`w-[1rem] border border-white ${color}`}>
      <div className="bg-black text-white" />
    </div>
  );
};
