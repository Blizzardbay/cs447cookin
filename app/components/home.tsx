"use client";

import { useState, useEffect } from "react";
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import AddRecipeBtn from "../components/addRecipeBtn";
import FilterBtn from "../components/filterBtn";
import { useRouter } from "next/navigation";

// TODO: Add animation for recipes
// TODO: Add functionality to sideBar (Navigation)
// TODO: Fix the page to view RecipeGrid
// TODO: Handle recipe data and states (useEffect)

// TODO: Create a Dropdown button next to add recipe

// TODO: Remove search bar
// TODO: Create a Profile page with delete account functionality
// Done: Create a View Recipe function (Modal)
// Done: Create a Modify Recipe function (Modal)
// Done: Create a Delete recipe function (Modal)
// Done: Create a Add Recipe function (Modal)
// Done: Create a Favorites page
// Done: Add functionality to header (Search)
// Done: Create a searchBar component for recipes
// Done: Create a useState for recipes and search

const Home = ({ data, favorites }) => {
	const [filterSelection, setFilterSelection] = useState(new Set(["All"]));


  // Recipes State
  const [logged_in, setLoggedIn] = useState(false);
	useEffect(() => {
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		if(str.length >= 2) {
			if(str[0] === "LoggedInUser") {
				setLoggedIn(true);
			}
		}
	}, []);
	
	const [recipe_list, setRecipeList] = useState(data.data);
	const [update, setUpdate] = useState(false);
	const [updateMain, setUpdateMain] = useState(false);
	const [current_favorites, setCurrentFavorites] = useState(favorites);
	
	const modify_list = (new_data, filter) => {
		setRecipeList(new_data);
		setFilterSelection(filter);
		setUpdate(!update);
	};
	const update_main = (favorite, action, new_change, old_name) => {
		if(filterSelection.has("Favorites") && action === "REMOVE") {
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
					var temp = JSON.parse(JSON.stringify(current_favorites));
					temp.push(favorite)
					setCurrentFavorites(temp);
				}
			}
		}
		if(action == "MODIFY") {
			var temp2 = JSON.parse(JSON.stringify(recipe_list));
			
			for(var i = 0; i < recipe_list.length;i++) {
				if(recipe_list[i].recipe_title === old_name) {
					var temp = JSON.parse(JSON.stringify(recipe_list[i]));
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
	
	if(logged_in === true) {
	  return (
		<div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
		  <SideBar></SideBar>
		  <div className="w-full h-full flex flex-col">
			<Header />
			<div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
			  <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
				<h2 className={`${pacifico.className} text-3xl`}>Recipes</h2>
				<div className="flex flex-row gap-4">
				  <FilterBtn recipes={data.data} modifyList={modify_list} currentfSelection={filterSelection} favorites={current_favorites}/>
				  <AddRecipeBtn />
				</div>
			  </div>
			  <RecipeGrid recipes={recipe_list} favorites={current_favorites} update={update} update_main={update_main}></RecipeGrid>
			</div>
		  </div>
		</div>
	  );
  }
   return (
		<div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
		  <SideBar></SideBar>
		  <div className="w-full h-full flex flex-col">
			<Header />
			<div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
			  <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
				<h2 className={`${pacifico.className} text-3xl`}>Recipes</h2>
				<div className="flex flex-row gap-4">
				  <FilterBtn recipes={data.data} modifyList={modify_list} currentfSelection={filterSelection} favorites={current_favorites}/>
				</div>
			  </div>
			  <RecipeGrid recipes={recipe_list} favorites={current_favorites} update={update} update_main={update_main}></RecipeGrid>
			</div>
		  </div>
		</div>
	  );
}

export default Home;