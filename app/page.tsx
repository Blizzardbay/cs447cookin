"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { tryUserLogin } from "@/app/util/data";
import { inter, pacifico } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import cookinIcon from "@/app/assets/images/cookinIcon1.png";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user_logged_in, setUserLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const cookie_list = document.cookie;

    const str = cookie_list.split("=");
    if (str.length >= 2) {
      if (str[0] === "LoggedInUser") {
        setUserLoggedIn(true);
        router.push("/home");
      }
    }
  }, [router]);

  const login = async (data) => {
    data.preventDefault();

    const result = await tryUserLogin(
      new FormData(data.target),
      user_logged_in
    );

    if (result.success == true) {
      router.push("/home");
    } else {
      toast.error(result.error ?? "");
    }
  };

  return (
    <div
      className={`${inter.className} antialiased relative h-full w-full min-w-[768px] flex flex-col gap-16 justify-center items-center select-none overflow-hidden`}
    >
      <header
        className={`${pacifico.className} antialiased flex flex-col gap-4 items-center justify-center`}
      >
        <h1 className="text-8xl">Cookin'</h1>
        <p className="text-lg">Cookin' Up Flavor, One Recipe at a Time!</p>
      </header>
      <main className="w-[30%] flex flex-col gap-6 justify-center items-center [&>form]:m-auto [&>form]:text-center [&>form]:w-full ">
        <Link href="/home" className="text-3xl font-semibold md:text-4xl">
          Ready up 😋!
        </Link>
        <form
          onSubmit={login}
          className="w-full flex flex-col gap-6 [&>label]:font-semibold"
        >
          <div className="flex flex-col gap-[2px] items-start">
            <label htmlFor="username" className="text-lg">
              Email
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your email"
              autoComplete="off"
              required
              className="w-full h-10 px-3 border-[1px] border-[${login_color}] rounded-md truncate"
            />
          </div>
          <div className="relative flex flex-col gap-[2px] items-start">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              required
              className="w-full h-10 px-3 pr-12 border-[1px] border-[${login_color}] rounded-md truncate"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-0 py-2 px-2 cursor-pointer"
            >
              {showPassword ? (
                <IoEyeOutline name="eye" size={24} color="gray" />
              ) : (
                <IoEyeOffOutline name="eye-off" size={24} color="gray" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-10 text-lg text-white bg-black rounded-full hover:opacity-80"
          >
            Login
          </button>
        </form>
        <p>
          Need an account?{" "}
          <Link href="/signup" className="font-semibold">
            Sign up
          </Link>
        </p>
      </main>
      <Image
        src={cookinIcon}
        alt="Cookin Icon"
        className="absolute w-[512px] bottom-[25%] -right-[40%] lg:-right-[20%] xl:-right-[10%]"
      />
      <Image
        src={cookinIcon}
        alt="Cookin Icon"
        className="absolute w-[512px] bottom-[5%] -left-[40%] lg:-left-[20%] xl:-left-[10%] scale-x-[-1]"
      />

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
