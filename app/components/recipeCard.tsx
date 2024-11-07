import Image, { StaticImageData } from "next/image"
import { IoCloseCircleOutline, IoCreateOutline } from "react-icons/io5"
import DeleteRecipeBtn from "./deleteRecipeBtn"


type RecipeCardProps = {
    title: string;
    image: StaticImageData;
}

export default function RecipeCard({ title, image }: RecipeCardProps) {
    return (
        <div className="p-2 pb-1 flex flex-col gap-2 border-2 border-black rounded-lg">
            <div className="w-[260px] h-[160px] relative">
                <Image
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full border-2 border-black rounded-lg brightness-[55%]"
                />
                <p className="absolute top-[45%] right-[35%] text-xl text-white">View Recipe</p>
                {/*  */}
                <div className="absolute top-2 right-2">
                    <DeleteRecipeBtn></DeleteRecipeBtn>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-semibold">{title}</h3>
                <IoCreateOutline size={32} color="black" />
            </div>
        </div>
    )
}