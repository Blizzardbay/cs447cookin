import { StaticImageData } from "next/image";
import DeleteRecipeBtn from "./deleteRecipeBtn";
import ModifyRecipeBtn from "./modifyRecipeBtn";
import ViewRecipeBtn from "./viewRecipeBtn";
import { useState, useEffect, useRef } from 'react';

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

export default function RecipeCard({ recipe, favorites, update, update_main }) {
	const [logged_in, setLoggedIn] = useState(false);
	const [user, setUser] = useState("");
	useEffect(() => {
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		if(str.length >= 2) {
			if(str[0] === "LoggedInUser") {
				setLoggedIn(true);
				setUser(decodeURIComponent(str[1]));
			}
		}
	}, []);
	
	if(logged_in === true && recipe.creator === user) {
		return (
			<div className="w-[100%] h-[288px] p-2 flex flex-col gap-2 border-2 border-black rounded-lg hover:text-white hover:bg-black">
			  <div className="h-[85%] relative">
				<ViewRecipeBtn recipe={recipe} favorites={favorites} update={update} update_main={update_main}/>
				<ModifyRecipeBtn recipe={recipe} style="absolute top-2 right-2" update_main={update_main}  />
			  </div>
			  <div className="h-min flex flex-row justify-between items-center">
				<h3 className="text-md xl:text-lg font-semibold pointer-events-none">{recipe.recipe_title}</h3>
				<DeleteRecipeBtn recipe={recipe} update_main={update_main} />
			  </div>
			</div>
		);
	}
	return (
    <div className="w-[100%] h-[288px] p-2 flex flex-col gap-2 border-2 border-black rounded-lg hover:text-white hover:bg-black">
      <div className="h-[85%] relative">
        <ViewRecipeBtn recipe={recipe} favorites={favorites} update={update} update_main={update_main}/>
      </div>
      <div className="h-min flex flex-row justify-between items-center">
        <h3 className="text-md xl:text-lg font-semibold pointer-events-none">{recipe.recipe_title}</h3>
      </div>
    </div>
  );
}
