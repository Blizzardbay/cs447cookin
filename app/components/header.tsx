import {pacifico} from '@/app/fonts/fonts'
import SearchBar from './searchBar'

type HeaderProps = {
    search: string;
    setSearch: (search: string) => void;
}

export default function Header({search, setSearch}: HeaderProps) {
    return (
        <header className='p-8 h-min w-full flex flex-row gap-16 border-b-2'>
            <h1 className={`${pacifico.className} text-4xl`}>Cookin'</h1>
            <SearchBar search={search} setSearch={setSearch}></SearchBar>
        </header>
    )
}