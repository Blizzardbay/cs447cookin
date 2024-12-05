import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const Recipe = ({ recipe, bisFavorite, ftoggleFavorite, user, addFavorite, removeFavorite }) => {
	const recipe_title = recipe.recipe_title; 
	const cuisine = recipe.cuisine; 
	const ingredients = recipe.ingredients; 
	const directions = recipe.directions; 
	const serving = recipe.serving; 
	const prep_time = recipe.prep_time; 
	const cook_time = recipe.cook_time; 
	const total_time = recipe.total_time; 
	const notes = recipe.notes;
	const creator = recipe.creator;
	const creation_date = recipe.creation_date;
	const food_type = recipe.food_type;
	const food_cost = recipe.food_cost;

	const [color_background, setColorBackground] = useState([bisFavorite === true ? "red" : "white", bisFavorite]);

	const color_text = "black";
	
	const router = useRouter();
	
	const favorite_recipe = async (data) => {
		data.preventDefault();
		
		if(user !== "") {
			const result = await ftoggleFavorite(!color_background[1] , user, recipe_title);
			
			if(!color_background[1] === true) {
				setColorBackground(["red", !color_background[1] ]);
				addFavorite(recipe);
			}
			else {
				setColorBackground(["white", !color_background[1] ]);
				removeFavorite(recipe);
			}
		}
		else {
			router.push('/login');
		}
	};
	useEffect(() => {
		if(bisFavorite === true) {
			setColorBackground(["red", true ]);
		}
		else {
			setColorBackground(["white", false ]);
		}
	}, [bisFavorite]);

	return (
		<div style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", display: "inline-block", verticalAlign: "top", marginRight: "5px"}}>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Recipe Title: {recipe_title}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Cuisine: {cuisine}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Ingredients: {ingredients}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Directions: {directions}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Serving: {serving}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Prep Time: {prep_time}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Cook Time: {cook_time}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Total Time: {total_time}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Notes: {notes}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Creator: {creator}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Creation Date: {creation_date}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Creation Date: {creation_date}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Food Type: {food_type}</p>
			<p style={{ wordWrap: "break-word", width: "250px"}}>Food Cost: {food_cost}</p>
			<form onSubmit={favorite_recipe} style={{textAlign: "center"}}>
				<button type="submit" style={{color: color_text, backgroundColor: color_background[0]}}>Favorite Recipe</button>
			</form>
		</div>
	);
};

export default Recipe;