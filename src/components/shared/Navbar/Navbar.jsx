"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/logo.svg";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  
  const navitems = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About" },
    { path: "/service", title: "Services" },
    { path: "/contact", title: "Contact" },
    { path: "/blog", title: "Blog" },
    { path: "/mybookings", title: "Mybooking" },
  ];

  // Load user data from the API
  const load = async () => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/api/${session?.user?.email}`);
      if (!resp.ok) {
        throw new Error(`Error: ${resp.statusText}`);
      }
      const data = await resp.json();
      setUserData(data.user);
    } catch (error) {
      console.error("Error loading user data:", error);
     
    }
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      load();
    }
  }, [session, status]);

  return (
    <div className="bg-slate-100 text-gray-800">
 
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content space-y-2 text-gray-800 bg-slate-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navitems.map((item) => (
                <Link className="hover:text-orange-400" href={item.path} key={item.path}>
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>
          <Link href={"/"}>
            <Image width={100} height={90} alt="logo" src={logo} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="items-center space-x-4 flex">
            {navitems.map((item) => (
              <Link className="hover:text-orange-400" href={item.path} key={item.path}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex invisible lg:visible space-x-5 mr-2 text-2xl">
            <LuShoppingCart />
            <IoSearchOutline />
          </div>
          <Link href={'/'} className="btn invisible lg:visible md:visible btn-outline bg-orange-500 text-white hover:bg-orange-500">
            Appointment
          </Link>
          {status === "loading" && <h3>Loading...</h3>}
          {status === "authenticated" ? (
            <button onClick={() => signOut()} className="btn btn-outline bg-orange-500 text-white hover:bg-orange-500">
              Logout
            </button>
          ) : (
            <Link href={"/login"} className="btn btn-outline bg-orange-500 text-white hover:bg-orange-500">
              Login
            </Link>
          )}
          <div className="ps-6 flex">
            <div className="mr-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                  <Link href={`/profile`}>
                    <Image
                      alt="Profile Picture"
                      width={200}
                      height={250}
                      src={userData?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <span>{session?.user?.name}</span> <br />
              <span>{session?.user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
