import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const htmlElem = document.documentElement;
    if (theme === "dark") {
      htmlElem.classList.add("dark");
      htmlElem.classList.remove("light");
    } else if (theme === "light") {
      htmlElem.classList.remove("dark");
      htmlElem.classList.add("light");
    } else {
      htmlElem.classList.add("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
