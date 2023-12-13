import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button className="inline-flex items-center justify-center shadow-md border-2 whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full" onClick={handleClick}>
        <Sun className="h-[1.2em] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2em] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <p className="hidden">hidden</p>
      </button>
    </div>
  );
};

export default ThemeToggler;
