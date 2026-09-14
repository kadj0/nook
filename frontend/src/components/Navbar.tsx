import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigateTo } from "../utils/Constants";
import chevronRightWhite from "../assets/svgs/chevron-right-white.svg";
import exit from "../assets/svgs/exit.svg";
import menu from "../assets/svgs/menu.svg";
import menuDark from "../assets/svgs/menu-dark.svg";
import profileCard from "../assets/svgs/profile-card.svg";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { pathname } = useLocation();

  const links = [
    { link: "/listings", label: "Explore listings" },
    { link: "/watchlist", label: "My watchlist" },
    { link: "/calculator", label: "Rent calcualtor" },
    { link: "/settings", label: "CBF user", isProfile: true },
  ];

  const lightNav =
    pathname === "/" || pathname === "/watchlist" || pathname === "/listings";

  return (
    <>
      <nav
        className={`relative w-full shrink-0 z-100 transition ${lightNav ? "text-white" : "text-black"}`}
      >
        <span
          className={`${lightNav ? "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 via-black/15 to-transparent z-10" : ""}`}
        />
        <div className="flex absolute items-center justify-between px-[8vw] h-20 inset-0 z-100">
          <Link
            to="/"
            className="font-extrabold text-[1.15rem] tracking-tight z-15"
          >
            Nook
          </Link>
          <div className="flex items-center ml-auto gap-6">
            <span
              className="md:hidden block h-[28px] w-[28px] cursor-pointer"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <img src={lightNav ? menu : menuDark} alt="Open menu" />
            </span>
            <div
              className={`md:flex hidden items-center font-normal text-[0.9rem] gap-4 z-15 ${showMenu ? "" : ""}`}
            >
              {links.map((item) => (
                <Link
                  to={`${item.link}`}
                  className={`underline-offset-6 hover:underline ${
                    item.isProfile ? "inline-flex items-center gap-2" : ""
                  }`}
                >
                  {item.isProfile ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3F4A36]">
                      <img src={profileCard} alt="" aria-hidden="true" className="h-5 w-5" />
                    </span>
                  ) : null}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {showMenu && (
        <nav className="absolute min-h-screen left-0 bottom-0 w-full backdrop-blur-xl bg-[#0000003b] z-150">
          <div>
            <div className="flex items-center justify-between px-8 pt-5">
              <Link
                to="/"
                className="font-extrabold text-[1.15rem] tracking-tight z-15"
              >
                Nook
              </Link>
              <button
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                className=" h-[44px] w-[44px] items-center justify-center rounded-full px-3 py-3 hover:cursor-pointer transition bg-transparent hover:bg-black/15 z-20"
              >
                <img src={exit} className="" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center px-6 pt-10 m-auto z-200">
              {links.map((item) => (
                <Link
                  to={`${item.link}`}
                  className={`w-full text-lg underline-offset-6 rounded-sm p-3 hover:bg-black/15 transition`}
                  onClick={() => {
                    setShowMenu(!showMenu);
                    navigateTo();
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="inherit">
                      {item.isProfile ? (
                        <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3F4A36]">
                          <img src={profileCard} alt="" aria-hidden="true" />
                        </span>
                      ) : null}
                      {item.label}
                    </span>
                    <span>
                      <img src={chevronRightWhite} alt="" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
