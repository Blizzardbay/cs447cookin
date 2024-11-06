'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { insertUserData, removeUserData, tryUserLogin } from '@/app/util/data';
import {inter, pacifico} from '@/app/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import cookinIcon from '@/app/assets/images/cookinIcon1.png';

export default function Home() {
	const router = useRouter();
	
	router.push("/mainpage");
	
	const [dots, setDots] = useState("");

	const interval = setInterval(() => {
		setDots(dots.concat("."));
		if(dots.length > 2) {
			setDots("");
		}
	}, 1000);
	
	
	useEffect(() => {
		return () => clearInterval(interval);
	}, []);
	
	return (
		<div>
			<h1 style={{ fontSize: "60px", color:"#0000EE", textAlign: "center", marginTop: "20%", position: "abosolute"}}>Loading {dots}</h1>
				<div className={`${inter.className} antialiased relative min-h-screen min-w-[768px] mx-auto flex flex-col gap-16 justify-center items-center`}></div>
			<header className={`${pacifico.className} antialiased flex flex-col gap-4 items-center justify-center`}>
				<h1 className='text-8xl'>Cookin'</h1>
				<p className='text-2xl'>Cookin' Up Flavor, One Recipe at a Time!</p>
			</header>
		  	<main className="w-[30%] flex flex-col gap-6 justify-center items-center [&>form]:m-auto [&>form]:text-center [&>form]:w-full ">
				<h3 className='text-4xl font-semibold'>Ready up 😋!</h3>
				<form action={tryUserLogin} className='w-full flex flex-col gap-6 [&>label]:font-semibold'>
					<div className='flex flex-col gap-[2px] items-start'>
						<label htmlFor='username' className='text-lg'>Email</label>
						<input type="text" name="username" placeholder='Enter your email' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
					</div>
					<div className='flex flex-col gap-[2px] items-start'>
						<label htmlFor="password" className='text-lg'>Password</label>
						<input type="text" name="password" placeholder='Enter your password' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
					</div>
					<div className='w-full text-white bg-black rounded-full'>
						<button type="submit" className='h-10 text-lg'>Login</button>
					</div>
				</form>
				<p>Need an account? <Link href="/" className='font-semibold'>Sign up</Link></p>
			</main>
			<Image
				src={cookinIcon}
				alt='Cookin Icon'
				className='absolute w-[512px] bottom-[25%] -right-[40%] lg:-right-[20%] xl:-right-[10%]'
			/>
			<Image
				src={cookinIcon}
				alt='Cookin Icon'
				className='absolute w-[512px] bottom-[5%] -left-[40%] lg:-left-[20%] xl:-left-[10%] scale-x-[-1]'
			/>

			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}