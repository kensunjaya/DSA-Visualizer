interface SortingBarProps {
  value: number;
  color: string;
}

export const SortingBar = ({ value, color }: SortingBarProps) => {
  return (
    <div style={{ height: `${value}rem` }} className={`w-full border border-primary ${color}`}>
      <div className="bg-secondary" />
    </div>
  );
};
