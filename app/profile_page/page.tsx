"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import DeleteAccountBtn from "../components/deleteAccountBtn";
import Header from "../components/header";
import profileImage from "@/app/assets/images/pfp.jpg"

import RecipeImage from "../assets/images/grilled-cheese-sandwich.jpg";

export default function Profile() {
  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header/>
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
          <div className="pb-4 w-full h-16 flex flex-row gap-8 justify-start items-center border-b-2">
            <Image src={profileImage} alt="Profile Icon" className="w-16 rounded-full" />
            <h2 className={`${pacifico.className} text-3xl`}>Profile</h2>
          </div>
          <DeleteAccountBtn/>
        </div>
      </div>
    </div>
  );
}
