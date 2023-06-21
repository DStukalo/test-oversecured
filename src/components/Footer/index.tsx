import { SVGWrapper } from "../SVGWrapper";

const Footer = () => {
  return (
    <footer className=" flex items-center justify-center gap-20 border-t border-secondary-100 py-3 md:pt-6 ">
      <a href="https://github.com/DStukalo" target="blank">
        <SVGWrapper
          file="social"
          id="github_icon"
          classes="w-6 h-6 fill-tertiary-200 hover:fill-tertiary-100 "
        />
      </a>
      <div className=" text-tertiary-200">2023&#169;</div>
    </footer>
  );
};

export default Footer;
