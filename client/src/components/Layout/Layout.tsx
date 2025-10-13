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
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};
