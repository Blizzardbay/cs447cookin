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
		</div>
	);
};

export default Recipe;