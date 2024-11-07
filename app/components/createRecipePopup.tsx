import Image, { StaticImageData } from "next/image"
import {IoCloseCircleOutline} from "react-icons/io5"

type RecipeCardProps = {
    recipe: {
        image: StaticImageData;
        title: string;
        cuisine: string;
        foodType: string;
        cost: string;
        ingredients: string[];
        directions: string[];
        servings: number;
        prepTime: number;
        cookTime: number;
        totalTime: number;
        notes: string;
    }
}

export default function CreateRecipePopup({recipe}: RecipeCardProps) {
    return (
        <div>
            <div>
                <h2>Create Recipe</h2>
                <IoCloseCircleOutline></IoCloseCircleOutline>
            </div>
        </div>
    )
}