import { Heading } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";

interface LayoutProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export const Layout = ({
  title,
  className,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={className}>
      {title && <Heading size={'4xl'}>{title}</Heading>}
      {children}
    </div>
  );
};
