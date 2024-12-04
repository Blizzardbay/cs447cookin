import { StaticImageData } from "next/image";
import Home from "../components/favorites";
import { LogOut, insertRecipe, deleteRecipe, GetAllRecipes, toggleFavorite, getFavorites } from '@/app/util/data';
import { cookies } from 'next/headers';

<<<<<<< Updated upstream
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import FilterBtn from "../components/filterBtn";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
=======
export default async function Page() {
	const data = await GetAllRecipes();
>>>>>>> Stashed changes

	const cookieStore = await cookies()
 
	const logged_in = cookieStore.get('LoggedInUser')
	
	if(logged_in) {
		// logged_in.value
		const favorites = await getFavorites(logged_in.value);
		
		return (<Home data={data} favorites={favorites.data.rows}/>);
	}

<<<<<<< Updated upstream
  useEffect(() => {
    try {
      // Fetch recipes from database (include filter)
      // Code here...
      toast.success(`Recipes fetched!`);
    } catch (error) {
      toast.error(`Error fetching recipes!`);
      console.error(`Error fetching recipes: ${error}`);
    } finally {
      // Debug message
      console.log(`Fetching recipes: ${recipes}`);
    }
  }, [recipes]);

  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
          <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
            <h2 className={`${pacifico.className} text-4xl`}>
              Favorite Recipes
            </h2>
            <FilterBtn/>
          </div>
          <RecipeGrid recipes={recipes}></RecipeGrid>
        </div>
      </div>
    </div>
  );
=======
	return (<Favorite data={data} favorites={null}/>);
>>>>>>> Stashed changes
}
