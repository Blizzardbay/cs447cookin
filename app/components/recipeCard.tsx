import { StaticImageData } from "next/image";
import DeleteRecipeBtn from "./deleteRecipeBtn";
import ModifyRecipeBtn from "./modifyRecipeBtn";
import ViewRecipeBtn from "./viewRecipeBtn";

type RecipeCardProps = {
  recipe: {
    image?: string;
    title?: string;
    cuisine?: string;
    foodType?: string;
    cost?: string;
    ingredients?: string[];
    directions?: string[];
    servings?: number;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    favorite?: boolean;
    notes?: string;
  };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="w-[100%] h-[288px] p-2 flex flex-col gap-2 border-2 border-black rounded-lg">
      <div className="h-[85%] relative">
        <ViewRecipeBtn recipe={recipe}/>
        <ModifyRecipeBtn recipe={recipe} style="absolute top-2 right-0" />
      </div>
      <div className="h-min flex flex-row justify-between items-center">
        <h3 className="text-md xl:text-lg font-semibold">{recipe.title}</h3>
        <DeleteRecipeBtn recipe={recipe} />
      </div>
    </div>
  );
}
