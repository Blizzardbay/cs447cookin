'use client';

import { IoHomeOutline, IoHeartOutline, IoInformationCircleOutline, IoSettingsOutline } from "react-icons/io5"
import Image from "next/image"
import Link from "next/link"
import profileImage from "@/app/assets/images/pfp.jpg"



export default function SideBar() {
    return (
        <div className="w-20 h-screen flex flex-col justify-between items-center bg-black">
            <div className="flex flex-col justify-center items-center">
                <Link href="/" className="py-8">
                    <Image src={profileImage} alt="Profile Icon" className="w-16 border-2 border-white rounded-full" />
                </Link>
                <div className="py-4 flex flex-col gap-4 border-t-[1px] border-b-[1px] border-[#6C6C6C]">
                    <Link href="/"><IoHomeOutline size={32} color="DBDBDB" /></Link>
                    <Link href="/"><IoHeartOutline size={32} color="3D3D3D" /></Link>
                </div>
            </div>
            <div className="py-8 flex flex-col gap-4">
                <Link href="/"><IoInformationCircleOutline size={32} color="3D3D3D" /></Link>
                <Link href="/"><IoSettingsOutline size={32} color="3D3D3D" /></Link>
            </div>
        </div>
    )
}