const Recipe = ({ recipe }) => {
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

	return (
		<div style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", display: "inline-block"}}>
			<p>Recipe Title: {recipe_title}</p>
			<p>Cuisine: {cuisine}</p>
			<p>Ingredients: {ingredients}</p>
			<p>Directions: {directions}</p>
			<p>Serving: {serving}</p>
			<p>Prep Time: {prep_time}</p>
			<p>Cook Time: {cook_time}</p>
			<p>Total Time: {total_time}</p>
			<p>Notes: {notes}</p>
			<p>Creator: {creator}</p>
			<p>Creation Date: {creation_date}</p>
			<p>Creation Date: {creation_date}</p>
			<p>Food Type: {food_type}</p>
			<p>Food Cost: {food_cost}</p>
		</div>
	);
};

export default Recipe;