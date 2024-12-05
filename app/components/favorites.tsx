"use client";

import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import { useState } from "react";

const Favorite = ({ data, favorites }) => {
	const [current_favorites, setCurrentFavorites] = useState(favorites);
	const [recipe_list, setRecipeList] = useState(data.data.filter((recipe) => {
		for(let i = 0; i < current_favorites.length;i++) {
			if(recipe.recipe_title === current_favorites[i].recipe_title) {
				return true;
			}
		}
		return false;
	}));
	const [update, setUpdate] = useState(false);
	const [updateMain, setUpdateMain] = useState(false);
	
	const update_main = (favorite, action, new_change, old_name) => {
		if(action === "REMOVE") {
			setRecipeList(recipe_list.filter((recipe) => recipe.recipe_title !== favorite.recipe_title));
		}
		if(action === "REMOVELIST") {
			setRecipeList(recipe_list.filter((recipe) => recipe.recipe_title !== old_name));
		}
		if(current_favorites !== null) {
			if(action === "REMOVE") {
				
				setCurrentFavorites(current_favorites.filter((recipe) => recipe.recipe_title !== favorite.recipe_title));
			}
			else {
				if(action === "ADD") {
					const temp = JSON.parse(JSON.stringify(current_favorites));
					temp.push(favorite)
					setCurrentFavorites(temp);
				}
			}
		}
		if(action == "MODIFY") {
			const temp2 = JSON.parse(JSON.stringify(recipe_list));
			
			for(let i = 0; i < recipe_list.length;i++) {
				if(recipe_list[i].recipe_title === old_name) {
					const temp = JSON.parse(JSON.stringify(recipe_list[i]));
					temp.recipe_title = new_change.title;
					temp.cuisine = new_change.cuisine;
					temp.food_type = new_change.foodType;
					temp.food_cost = new_change.cost;
					temp.ingredients = new_change.ingredients;
					temp.directions = new_change.directions;
					temp.serving = new_change.servings;
					temp.prep_time = new_change.prepTime;
					temp.cook_time = new_change.cookTime;
					temp.total_time = new_change.totalTime;
					temp.notes = new_change.notes;
					temp2[i] = temp;
					setRecipeList(temp2);
					break;
				}
			}
		}
		setUpdate(!update);
		setUpdateMain(!updateMain);
	};

  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
          <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
            <h2 className={`${pacifico.className} text-3xl`}>
              Favorite Recipes
            </h2>
          </div>
          <RecipeGrid recipes={recipe_list} favorites={current_favorites} update={update} update_main={update_main}></RecipeGrid>
        </div>
      </div>
    </div>
  );
}

export default Favorite;