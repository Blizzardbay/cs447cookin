import { StaticImageData } from "next/image";
import Favorite from "../components/favorites";
import { LogOut, insertRecipe, deleteRecipe, GetAllRecipes, toggleFavorite, getFavorites } from '@/app/util/data';
import { cookies } from 'next/headers';
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import FilterBtn from "../components/filterBtn";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default async function Page() {
	const data = await GetAllRecipes();

	const cookieStore = await cookies()
 
	const logged_in = cookieStore.get('LoggedInUser')
	
	if(logged_in) {
		// logged_in.value
		const favorites = await getFavorites(logged_in.value);
		
		if(favorites) {
			if(favorites.data) {
				return (<Favorite data={data} favorites={favorites.data.rows}/>);
			}
		}
	}

	return (<Favorite data={data} favorites={null}/>);
}
