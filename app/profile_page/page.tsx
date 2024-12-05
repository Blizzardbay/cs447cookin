"use client";

import Image from "next/image";
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import LogOutBtn from "../components/logOutBtn";
import DeleteAccountBtn from "../components/deleteAccountBtn";
import Header from "../components/header";
import profileImage from "@/app/assets/images/pfp.jpg"

export default function Profile() {
  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header/>
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-8">
          <div className="pb-4 w-full flex flex-row gap-8 justify-start items-center border-b-2">
            <Image src={profileImage} alt="Profile Icon" className="w-24 rounded-full" />
            <h2 className={`${pacifico.className} text-4xl`}>My Account</h2>
          </div>
          <div className="flex flex-col gap-4">
            <LogOutBtn/>
            <DeleteAccountBtn/>
          </div>
        </div>
      </div>
    </div>
  );
}
