import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

const Gutter: React.FC<Props> = ({
  size = "md",
  disabled = false,
  as: Component = "div",
  className,
  ...props
}) => {
  return (
    <Component
      {...props}
      className={twMerge(
        "w-full",
        !disabled && "mx-auto",
        !disabled && size === "sm" && "max-w-[min(640px,90%)]",
        !disabled && size === "md" && "max-w-[min(820px,90%)]",
        !disabled && size === "lg" && "max-w-[min(1280px,90%)]",
        !disabled && size === "xl" && "px-[5%]",
        className,
      )}
    >
      {props.children}
    </Component>
  );
};
export default Gutter;
