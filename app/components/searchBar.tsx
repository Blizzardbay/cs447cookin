import { IoSearch, IoFilter } from "react-icons/io5";

type searchBarProps = {
    search: string;
    setSearch: (search: string) => void;
}

export default function searchBar({search, setSearch}: searchBarProps) {
  return (
    <div className="px-4 w-full flex flex-row justify-between items-center border-2 border-black rounded-full text-[#C2C2C2]">
      <div className="w-full flex flex-row gap-4">
        <IoSearch size={24} />
        {/* Create input field */}
        <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What do you want to cook today?"
            className="pr-2 w-full bg-transparent outline-none"
        /> 
      </div>
      <IoFilter size={24} />
    </div>
  );
}
