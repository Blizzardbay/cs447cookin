'use client';
import RecipeCard from "../components/recipeCard";

export default function RecipeGrid({ recipes, favorites, update, update_main }) {
	return (
		<div className="w-full h-[696px] justify-start grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll">
			{recipes.map((recipe: any, index: number) => {
				return (
					<RecipeCard key={index} recipe={recipe} favorites={favorites} update={update} update_main={update_main}></RecipeCard>
				);
			})}
		</div>
  )	;
}
