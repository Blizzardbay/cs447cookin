import { IoAddCircleOutline } from "react-icons/io5"

export default function AddRecipeBtn() {
    return (
        <button className="w-fit h-min py-1 px-4 flex flex-row gap-4 justify-center items-center text-lg border-2 border-black rounded-xl">Add Recipe <IoAddCircleOutline size={32}/></button>
    )
}