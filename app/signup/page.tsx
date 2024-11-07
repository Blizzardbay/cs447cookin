'use client';

import { insertUserData } from '@/app/util/data';
import {inter, pacifico} from '@/app/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import signupImage from '@/app/assets/images/signupImage.jpg';

export default function SignUp() {
    return (
        <div className={`${inter.className} antialiased min-h-screen min-w-[768px] grid grid-cols-2 gap-16 place-content-stretch place-items-stretch`}>
            <div>
                <Image 
                    src={signupImage}
                    alt='Signup Image'
                    className='object-cover w-full h-full'
                />
            </div>
            <div className='flex flex-col gap-16 justify-center items-center'>
                <header className={`${pacifico.className} antialiased flex flex-col gap-4 items-center justify-center`}>
                    <h1 className='text-6xl md:text-8xl'>Cookin'</h1>
                    <p className='text-lg'>Cookin' Up Flavor, One Recipe at a Time!</p>
                </header>
                <main className="w-[75%] flex flex-col gap-6 justify-center items-center [&>form]:m-auto [&>form]:text-center [&>form]:w-full ">
                    <h3 className='text-3xl font-semibold'>Create Account</h3>
                    <form action={insertUserData} className='w-full flex flex-col gap-6 [&>label]:font-semibold'>
                        <div className='flex flex-col gap-[2px] items-start'>
                            <label htmlFor='username' className='text-lg'>Email</label>
                            <input type="text" name="username" placeholder='Enter your email' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
                        </div>
                        <div className='flex flex-col gap-[2px] items-start'>
                            <label htmlFor="password" className='text-lg'>Password</label>
                            <input type="text" name="password" placeholder='Enter your password' className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"/>
                        </div>
                        <button type="submit" className='w-full h-10 text-lg text-white bg-black rounded-full'>Sign up</button>
                    </form>
                    <p>Already have an account? <Link href="/" className='font-semibold'>Sign in</Link></p>
                </main>
            </div>			
        </div>
    )
}