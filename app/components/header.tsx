import {pacifico} from '@/app/fonts/fonts'
import Image from 'next/image';
import cookinIcon from '@/app/assets/images/cookinIcon1.png';

export default function Header() {
    return (
        <header className='relative p-8 h-min w-full flex flex-row gap-16 border-b-2 justify-center items-center'>
            <Image
                src={cookinIcon}
                alt='Cookin Icon'
                height={80}
                width={80}
                className='absolute left-[5%] lg:left-[10%]'
            />
            <Image
                src={cookinIcon}
                alt='Cookin Icon'
                height={80}
                width={80}
                className='absolute left-[20%] lg:left-[25%] scale-x-[-1]'
            />
            <h1 className={`${pacifico.className} text-5xl`}>Cookin&apos;</h1>
            <Image
				src={cookinIcon}
				alt='Cookin Icon'
                height={80}
                width={80}
				className='absolute right-[20%] lg:right-[25%]'
			/>
            <Image
                src={cookinIcon}
                alt='Cookin Icon'
                height={80}
                width={80}
                className='absolute right-[5%] lg:right-[10%] scale-x-[-1]'
            />
        </header>
    )
}