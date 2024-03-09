import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const GlobalGrid: React.FC<Props> = ({ disabled, className, ...props }) => {
  return (
    <div
      className={twMerge(
        !disabled && "w-full md:grid md:grid-cols-14",
        className
      )}
    >
      {props.children}
    </div>
  );
};
export default GlobalGrid;
