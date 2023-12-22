"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import ThemeToggler from "./model/theme-model";

import LogoutModel from "./model/logout-model";

import { useAuth } from "@/context/auth";
import Instance from "@/lib/instance";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [auth] = useAuth();
  useEffect(() => {
    if (auth.token)
      Instance.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
  }, []);
  return (
    <>
      {open && <LogoutModel isOpen={open} onClose={() => setOpen(false)} />}
      <div className={`bg-center`}>
        <nav
          className={`mx-[24px] lg:mx-[160px] md:mx-[80px]   xl:mx-[160px] flex flex-col md:flex-row justify-between items-center ${
            !openMenu ? "h-[120px]" : "h-screen"
          } `}
        >
          <div
            className={`flex w-full md:max-w-fit justify-between items-center ${
              openMenu ? "border-b-2" : "border-none"
            } border-exact-black/25 dark:border-exact-white pb-4 md:border-none `}
          >
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="relative top-4 -left-8"
            />
            <div
              onClick={() => setOpenMenu(openMenu === false ? true : false)}
              className="md:hidden cursor-pointer"
            >
              <Image
                src={!openMenu ? "/OpenMenu.png" : "/CloseMenu.png"}
                className="filter dark:invert"
                alt="mobileMenu"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            className={`flex flex-col items-center md:space-x-20 space-y-10 ${
              !openMenu ? "invisible md:visible" : "visible"
            } md:space-y-0 mt-10 md:mt-0 lg:mt-0 h-screen md:h-auto md:flex-row`}
          >
            <li
              className={` ${
                pathname == "/"
                  ? "text-exact-purple dark:text-exact-yellow"
                  : "text-exact-gray dark:text-white"
              } cursor-pointer  text-xl  hover:text-exact-purple  dark:hover:text-exact-yellow font-semibold`}
            >
              <Link href={"/"}>Home</Link>
            </li>

            <li
              className={`  ${
                pathname == "/Quizs"
                  ? "text-exact-purple dark:text-exact-yellow"
                  : "text-exact-gray dark:text-white"
              }  cursor-pointer  text-xl  hover:text-exact-purple  dark:hover:text-exact-yellow font-semibold`}
            >
              <Link href={"/Quizs"}>Quizs</Link>
            </li>
            {!auth?.user?.admin ? (
              <li
                className={` cursor-pointer  ${
                  pathname == "/Results"
                    ? "text-exact-purple dark:text-exact-yellow"
                    : "text-exact-gray dark:text-white"
                } text-xl  hover:text-exact-purple  dark:hover:text-exact-yellow font-semibold`}
              >
                <Link href={"/Results"}>History</Link>
              </li>
            ) : (
              <li
                className={` cursor-pointer  ${
                  pathname == "/Admin"
                    ? "text-exact-purple dark:text-exact-yellow"
                    : "text-exact-gray dark:text-white"
                } text-xl  hover:text-exact-purple  dark:hover:text-exact-yellow font-semibold`}
              >
                <Link href={"/Admin"}>Admin</Link>
              </li>
            )}
          </ul>

          <div className="flex gap-4  items-center md:flex-row flex-col">
            <div className="lg:block hidden">
              <ThemeToggler />
            </div>
            <button
              className={`text-base w-full ${
                !openMenu ? "invisible md:visible" : "visible"
              } md:max-w-fit leading-[26px] font-semibold md:shadow-[-5px_10px_30px_rgba(76,64,247,0.5)] py-[19px] px-[35px] bg-exact-purple rounded-xl text-white`}
            >
              {!auth?.user?.email ? (
                <Link href={"/Auth"}> Log In / Sign Up</Link>
              ) : (
                <p onClick={() => setOpen(true)}>Log out</p>
              )}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
