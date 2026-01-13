"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-nestrly.png";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle, FaBars, FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const pathname: string = usePathname();

  return (
    <nav className="bg-[#0f172a] border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-yellow-400 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-14 w-auto"
                src={logo}
                alt="Nestrly"
                priority
              />
              <span className="hidden md:block text-white text-3xl font-bold ml-2">
                Nestrly
              </span>
            </Link>

            <div className="hidden md:ml-6 md:flex items-center">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "bg-yellow-900" : ""
                  } text-white hover:bg-yellow-900 rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === "/properties" ? "bg-yellow-900" : ""
                  } text-white hover:bg-yellow-900 rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                {isLoggedIn && (
                  <Link
                    href="/properties/add"
                    className={`${
                      pathname === "/properties/add" ? "bg-yellow-900" : ""
                    } text-white hover:bg-yellow-900 rounded-md px-3 py-2`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Menú derecha Logged Out */}
          {!isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <button className="flex items-center text-white bg-yellow-700 hover:bg-yellow-900 hover:text-white rounded-md px-3 py-2">
                  <FaGoogle className="text-white mr-2" />
                  <span>Login or Register</span>
                </button>
              </div>
            </div>
          )}

          {/* Menú derecha Logged In */}
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-yellow-800 p-1 text-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-6 w-6" />
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                </span>
              </Link>

              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-yellow-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                  id="user-menu-button"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileDefault}
                    alt="User Profile"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-yellow-700"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-yellow-700"
                    >
                      Saved Properties
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-sm text-yellow-700">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-yellow-900" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${
                pathname === "/properties" ? "bg-yellow-900" : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Properties
            </Link>
            {isLoggedIn && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add" ? "bg-yellow-900" : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Add Property
              </Link>
            )}
            {!isLoggedIn && (
              <button className="flex items-center text-white bg-yellow-700 hover:bg-yellow-900 rounded-md px-3 py-2 my-4">
                <FaGoogle className="text-white mr-2" />
                <span>Login or Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
