import useTheme from "~/hooks/useTheme";
import { SVGWrapper } from "../SVGWrapper";

const SwitchButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log(theme, "btn");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => toggleTheme()}
      className="min-w-8 inline-block rounded-full  p-0.5"
    >
      {theme === "dark" ? (
        <SVGWrapper
          file="theme"
          id="sun_icon"
          classes="w-8 h-8 fill-secondary-100"
        />
      ) : (
        <SVGWrapper
          file="theme"
          id="night_icon"
          classes="w-8 h-8 fill-secondary-100"
        />
      )}
    </button>
  );
};

export default SwitchButton;
