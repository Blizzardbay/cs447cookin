'use client';

import { IoHomeOutline, IoHeartOutline, IoInformationCircleOutline, IoSettingsOutline } from "react-icons/io5"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import profileImage from "@/app/assets/images/pfp.jpg"



export default function SideBar() {
    const path = usePathname();
    return (
        <div className="w-24 h-full flex flex-col justify-between items-center bg-black">
            <div className="flex flex-col justify-center items-center">
                <Link href="/" className="py-8">
                    <Image src={profileImage} alt="Profile Icon" className="w-16 border-2 border-white rounded-full" />
                </Link>
                <div className="py-4 flex flex-col gap-4 border-t-[1px] border-b-[1px] border-[#6C6C6C]">
                    <Link href="/home"><IoHomeOutline size={32} color={(path === "/home") ? "DBDBDB" : "3D3D3D"} /></Link>
                    <Link href="/favorites"><IoHeartOutline size={32} color={(path === "/favorites") ? "DBDBDB" : "3D3D3D"} /></Link>
                </div>
            </div>
            <div className="py-8 flex flex-col gap-4">
                <Link href="/"><IoInformationCircleOutline size={32} color="3D3D3D" /></Link>
                <Link href="/"><IoSettingsOutline size={32} color="3D3D3D" /></Link>
            </div>
        </div>
    )
}