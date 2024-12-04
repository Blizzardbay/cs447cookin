"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { insertUserData } from "@/app/util/data";
import { inter, pacifico } from "@/app/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import signupImage from "@/app/assets/images/signupImage.jpg";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const createAccount = async (data) => {
    data.preventDefault();

    const result = await insertUserData(new FormData(data.target));

    if (result.success == true) {
      router.push(result.redirectUrl);
    } else {
        toast.error(result.error);
    }
  };
  return (
    <div
      className={`${inter.className} antialiased min-h-screen min-w-[768px] grid grid-cols-2 gap-16 place-content-stretch place-items-stretch select-none`}
    >
      <div>
        <Image
          src={signupImage}
          alt="Signup Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-16 justify-center items-center">
        <header
          className={`${pacifico.className} antialiased flex flex-col gap-4 items-center justify-center`}
        >
          <h1 className="text-6xl md:text-8xl">Cookin'</h1>
          <p className="text-lg">Cookin' Up Flavor, One Recipe at a Time!</p>
        </header>
        <main className="w-[75%] flex flex-col gap-6 justify-center items-center [&>form]:m-auto [&>form]:text-center [&>form]:w-full ">
          <h3 className="text-3xl font-semibold">Create Account</h3>
          <form
            onSubmit={createAccount}
            className="w-full flex flex-col gap-6 justify-center items-center [&>label]:font-semibold"
          >
            <div className="w-full flex flex-col gap-[2px] items-start">
              <label htmlFor="username" className="text-lg">
                Email
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your email"
                autoComplete="off"
                required
                className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
              />
            </div>
            <div className="relative w-full flex flex-col gap-[2px] items-start">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
                required
                className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
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
              Sign up
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link href="/" className="font-semibold">
              Sign in
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
