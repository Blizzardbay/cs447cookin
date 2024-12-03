import { StaticImageData } from "next/image";
import RecipeCard from "../components/recipeCard";

type RecipeGridProps = {
  recipes: [
    {
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
    }
  ];
};

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="w-full h-[650px] justify-start grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll">
      {recipes.map((recipe: any, index: number) => {
        return (
            <RecipeCard key={index} recipe={recipe}></RecipeCard>
        );
      })}
    </div>
  );
}
