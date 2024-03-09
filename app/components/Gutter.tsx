import { twMerge } from "tailwind-merge";
import GlobalGrid from "./GlobalGrid";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

/**
 * sm - md: no grid
 * md - lg: 14 col grid
 * lg - xl: 14 col grid
 */
const sizeClassMap = {
  small: "md:col-start-4 md:col-span-8 lg:col-start-5 lg:col-span-6",
  medium: "md:col-start-3 md:col-span-10 lg:col-start-4 lg:col-span-8",
  large: "md:col-start-1 md:col-span-14 lg:col-start-2 lg:col-span-12",
};

const Gutter: React.FC<Props> = ({
  size = "medium",
  disabled,
  className,
  ...props
}) => {
  return (
    <GlobalGrid disabled={disabled}>
      <div {...props} className={twMerge(sizeClassMap[size], className)}>
        {props.children}
      </div>
    </GlobalGrid>
  );
};
export default Gutter;
