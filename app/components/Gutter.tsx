import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const Gutter: React.FC<Props> = ({
  size = "medium",
  disabled = false,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        "w-full",
        !disabled && "mx-auto",
        !disabled && size === "small" && "max-w-[min(640px,90%)]",
        !disabled && size === "medium" && "max-w-[min(1280px,90%)]",
        !disabled && size === "large" && "px-[5%]",
        className,
      )}
    >
      {props.children}
    </div>
  );
};
export default Gutter;
