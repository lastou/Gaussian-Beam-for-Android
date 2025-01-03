import { Text as TextRNR } from "~/components/ui/text";

export default function Text({
  children,
  className,
  ...props
}: {
  children: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <TextRNR className={`text-center ${className}`} {...props}>
      {children}
    </TextRNR>
  );
}
