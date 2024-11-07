import {pacifico} from '@/app/fonts/fonts'
import { IoSearch, IoFilter } from "react-icons/io5"


export default function Header() {
    return (
        <header className='p-8 h-min w-full flex flex-row gap-16 border-b-2'>
            <h1 className={`${pacifico.className} text-4xl`}>Cookin'</h1>
            <div className='px-4 w-full flex flex-row justify-between items-center border-2 border-black rounded-full text-[#C2C2C2]'>
                <div className='flex flex-row gap-4'>
                    <IoSearch size={24} />
                    <p>What do you want to cook today?</p>
                </div>
                <IoFilter size={24} />
            </div>
        </header>
    )
}