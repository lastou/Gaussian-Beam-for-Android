import { Badge as BadgeRNR } from "../ui/badge";

export default function Badge({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
  [key: string]: any;
}) {
  return (
    <BadgeRNR className={`w-32 mb-1 ${className}`} {...props}>
      {children}
    </BadgeRNR>
  );
}
