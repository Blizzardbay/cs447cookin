'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { insertUserData, removeUserData, tryUserLogin } from '@/app/util/data';
import {inter, pacifico} from '@/app/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import cookinIcon from '@/app/assets/images/cookinIcon1.png';

export default function Login() {
	return (
		<div className={`${inter.className} antialiased relative min-h-screen min-w-[768px] flex flex-col gap-16 justify-center items-center`}>
			<header className={`${pacifico.className} antialiased flex flex-col gap-4 items-center justify-center`}>
				<h1 className='text-8xl'>Cookin'</h1>
				<p className='text-lg'>Cookin' Up Flavor, One Recipe at a Time!</p>
			</header>
		  	<main className="w-[30%] flex flex-col gap-6 justify-center items-center [&>form]:m-auto [&>form]:text-center [&>form]:w-full ">
				<Link href="/mainpage" className='text-3xl font-semibold md:text-4xl'>Ready up 😋!</Link>
			{/* <form action={insertUserData}>
				<div className='flex flex-col items-start'>
					<label htmlFor='username'>Email</label>
					<input type="text" name="username" className="w-full h-8 border-[1px] border-black rounded-md"/>
				</div>
				<div className='flex flex-col items-start'>
					<label htmlFor="password">Password</label>
					<input type="text" name="password" className="w-full h-8 border-[1px] border-black rounded-md"/>
				</div>
				<div className='w-full text-white bg-black rounded-full'>
					<button type="submit" className='h-8'>Create User</button>
				</div>
			</form>
			<form action={removeUserData}>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<div className='w-full text-white bg-black rounded-full'>
					<button type="submit" className='h-8'>Delete User</button>
				</div>
			</form> */}
				<form action={tryUserLogin} className='w-full flex flex-col gap-6 [&>label]:font-semibold'>
					<div className='flex flex-col gap-[2px] items-start'>
						<label htmlFor='username' className='text-lg'>Email</label>
						<input type="text" name="username" placeholder='Enter your email' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
					</div>
					<div className='flex flex-col gap-[2px] items-start'>
						<label htmlFor="password" className='text-lg'>Password</label>
						<input type="text" name="password" placeholder='Enter your password' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
					</div>
					<button type="submit" className='w-full h-10 text-lg text-white bg-black rounded-full'>Login</button>
				</form>
				<p>Need an account? <Link href="/signup" className='font-semibold'>Sign up</Link></p>

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