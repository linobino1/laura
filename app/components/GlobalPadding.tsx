import { twMerge } from "tailwind-merge";

const GlobalPadding: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge("mx-auto max-w-[min(1280px,90%)]", className)}
    >
      {props.children}
    </div>
  );
};
export default GlobalPadding;
