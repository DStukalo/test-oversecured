import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { SVGWrapper } from "../SVGWrapper";
import SwitchButton from "./SwitchThemeBtn";

export default function Header() {
  const { data: sessionData } = useSession();
  const userImage = sessionData?.user.image ?? "";
  const router = useRouter();
  return (
    <header className="mb-10 flex w-full items-center justify-between border-b border-secondary-100 p-4 font-semibold">
      <Link
        href={"/"}
        className={
          router.pathname == "/"
            ? "header-link inline-block hover:cursor-default"
            : "header-link inline-block"
        }
      >
        <div className="flex flex-col items-center px-4">
          <h1>
            <SVGWrapper
              file="social"
              id="DS"
              classes="w-10 h-10 fill-secondary-100"
            />
          </h1>
        </div>
      </Link>
      <div className="px-4">
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href={"/"}
                className={
                  router.pathname == "/"
                    ? "header-link inline-block border-b pb-0.5 text-tertiary-200 hover:cursor-default "
                    : "header-link inline-block pb-0.5 text-secondary-100 hover:text-tertiary-100"
                }
              >
                Home
              </Link>
            </li>
            {!sessionData ? (
              <li>
                <Link
                  href={"/login"}
                  className={
                    router.pathname == "/login"
                      ? "header-link inline-block border-b pb-0.5 text-tertiary-200 hover:cursor-default "
                      : "header-link inline-block pb-0.5 text-secondary-100 hover:text-tertiary-100"
                  }
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <button
                  className="header-link inline-block border-secondary-100 pb-0.5 text-secondary-100 hover:bg-tertiary-100"
                  onClick={() => void signOut()}
                >
                  Log out
                </button>
                <Image
                  src={userImage}
                  alt="user avatar"
                  width={25}
                  height={25}
                />
              </>
            )}
            <li>
              <SwitchButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
