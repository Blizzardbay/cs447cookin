'use client';
import RecipeCard from "../components/recipeCard";

type RecipeCardProps = {
  recipe: {
      recipe_title: string;
      cuisine: string;
      food_type: string;
      food_cost: string;
      ingredients: string[];
      directions: string[];
      serving: number;
      prep_time: number;
      cook_time: number;
      total_time: number;
      notes: string;
  }
}

export default function RecipeGrid({ recipes, favorites, update, update_main }) {
	return (
		<div className="w-full h-[696px] justify-start grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll">
			{recipes.map((recipe : RecipeCardProps, index: number) => {
				return (
					<RecipeCard key={index} recipe={recipe} favorites={favorites} update={update} update_main={update_main}></RecipeCard>
				);
			})}
		</div>
  )	;
}
