import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}
const RichText: React.FC<Props> = ({ content, className, ...props }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className={twMerge("lexical", className)}
      {...props}
    />
  );
};
export default RichText;
