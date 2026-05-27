import type { ReactNode } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <>
      {showNav && <Nav />}
      {children}
    </>
  );
}
