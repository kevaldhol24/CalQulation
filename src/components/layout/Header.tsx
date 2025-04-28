import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className=" flex justify-between items-center px-6 py-3 shadow-sm">
      <nav className="container flex justify-between items-center w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" width={175} height={30} alt="Logo" />
        </Link>
        <div className="space-x-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
