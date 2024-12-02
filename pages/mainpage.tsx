'use client';
import { LogOut, insertRecipe, deleteRecipe, GetAllRecipes, toggleFavorite, getFavorites } from '@/app/util/data';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Recipe from '../app/components/recipe'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function Home({user_logged_in, username, recipes, unfiltered_recipes, favorite_recipes}) {
	const router = useRouter();
	
	const [display_create, setDisplayCreate] = useState((<div></div>));
	
    const [display_remove, setDisplayRemove] = useState((<div></div>));
	
	const [display_form_area, setDisplayFormArea] = useState((<div></div>));
	
	const [form_color, setFormColor] = useState("black");
    const [form_text, setFormText] = useState("");
	
	const [isOpenDropDown, setDropDownOpen] = useState(false);
	
	const [filterSelection, setFilterSelection] = useState(new Set(["All"]));
	
	const [current_recipes, setCurrentRecipes] = useState(recipes);
	
	const [current_favorites, setCurrentFavorites] = useState(favorite_recipes);
	
	const filterSelectionPrevous = useRef(filterSelection);
	
	const addFavorite = (recipe) => {
		if(current_favorites !== null) {
			if(current_favorites.length !== 0) {
				for(var i = 0; i < current_favorites.length ;i++) {
					if(current_favorites[i].recipe_title === recipe.recipe_title) {
						return;
					}
				}
			}
			const temp = JSON.parse(JSON.stringify(current_favorites));
			temp.push(recipe);
			setCurrentFavorites(temp);
		}
		else {
			return;
		}
	}
	
	const removeFavorite = (recipe) => {
		if(current_favorites !== null) {
			if(current_favorites.length !== 0) {
				for(var i = 0; i < current_favorites.length ;i++) {
					if(current_favorites[i].recipe_title === recipe.recipe_title) {
						const temp = JSON.parse(JSON.stringify(current_favorites));
						temp.splice(i, 1);
						setCurrentFavorites(temp);
						return;
					}
				}
				return;
			}
			return;
		}
	}
	
	const isFavorite = (recipe_title) => {
		if(current_favorites !== null) {
			if(current_favorites.length !== 0) {
				for(var i = 0; i < current_favorites.length ;i++) {
					if(current_favorites[i].recipe_title === recipe_title) {
						return true;
					}
				}
				return false;
			}
			return false;
		}
		return false;
	}
	useEffect(() => {
		if(filterSelection.currentKey === "Favorites Only") {
			var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					
			setCurrentRecipes(JSON.parse(JSON.stringify(temp.filter(recipe => isFavorite(recipe.recipe_title)))));
		}
	}, [current_favorites]);
	useEffect(() => {
		if(filterSelectionPrevous.current !== filterSelection.currentKey) {
			switch(filterSelection.currentKey) {
				case "Favorites Only": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					
					setCurrentRecipes(JSON.parse(JSON.stringify(temp.filter(recipe => isFavorite(recipe.recipe_title)))));
					break;
				}
				case "High To Low Cost": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					temp.sort((a, b) => {
						var cost_a = 0;
						var cost_b = 0;
						
						if(a.food_cost === "High") {
							cost_a = 3;
						}
						if(a.food_cost === "Medium") {
							cost_a = 2;
						}
						if(a.food_cost === "Low") {
							cost_a = 1;
						}
						if(b.food_cost === "High") {
							cost_b = 3;
						}
						if(b.food_cost === "Medium") {
							cost_b = 2;
						}
						if(b.food_cost === "Low") {
							cost_b = 1;
						}
						return cost_b - cost_a;
					});
					setCurrentRecipes(JSON.parse(JSON.stringify(temp)));
					break;
				}
				case "Low To High Cost": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					temp.sort((a, b) => {
						var cost_a = 0;
						var cost_b = 0;
						
						if(a.food_cost === "High") {
							cost_a = 3;
						}
						if(a.food_cost === "Medium") {
							cost_a = 2;
						}
						if(a.food_cost === "Low") {
							cost_a = 1;
						}
						if(b.food_cost === "High") {
							cost_b = 3;
						}
						if(b.food_cost === "Medium") {
							cost_b = 2;
						}
						if(b.food_cost === "Low") {
							cost_b = 1;
						}
						return cost_a - cost_b;
					});
					setCurrentRecipes(JSON.parse(JSON.stringify(temp)));
					break;
				}
				case "High To Low Time": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					temp.sort((a, b) => {
						return b.total_time - a.total_time;
					});
					setCurrentRecipes(JSON.parse(JSON.stringify(temp)));
					break;
				}
				case "Low To High Time": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					temp.sort((a, b) => {
						return a.total_time - b.total_time;
					});
					setCurrentRecipes(JSON.parse(JSON.stringify(temp)));
					break;
				}
				case "Recent": {
					var temp = JSON.parse(JSON.stringify(unfiltered_recipes));
					temp.reverse();
					setCurrentRecipes(JSON.parse(JSON.stringify(temp)));
					break;
				}
				case "All":
				default: {
					setCurrentRecipes(JSON.parse(JSON.stringify(unfiltered_recipes)));
					break;
				}
			}
		}
		filterSelectionPrevous.current = filterSelection.currentKey;
	}, [filterSelection]);
	
	useEffect(() => {
		if(Object.keys(display_create.props).length !== 0) {
			setDisplayFormArea((
				<div className="form_area" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}} >
					{display_create}
					{display_remove}
				</div>
			));
		}
	}, [display_create]);
	
	useEffect(() => {
		if(Object.keys(display_remove.props).length !== 0) {
			setDisplayFormArea((
				<div className="form_area" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}} >
					{display_create}
					{display_remove}
				</div>
			));
		}
	}, [display_remove]);
	
	if(user_logged_in) {
		if(user_logged_in === true) {
			const reset =  async (data) => {
				data.preventDefault();
				
				setDisplayCreate((<div></div>));
				setDisplayRemove((<div></div>));
				
				setDisplayFormArea((<div></div>));
			};
			const logout = async (data) => {
				data.preventDefault();
				
				setDisplayCreate((<div></div>));
				setDisplayRemove((<div></div>));
				
				const result = await LogOut(username);
				
				if(result.success == true) {
					router.push(result.redirectUrl);
					router.refresh();
				}
				else {
					setFormColor("red");
					setFormText(result.error);
				}
			};
			const create_recipe = async (data) => {
				data.preventDefault();
				
				const result = await insertRecipe(new FormData(data.target), 0);
		
				if(result.success == true) {
					setDisplayCreate((<div></div>));
					setDisplayFormArea((<div></div>));
					
					setFormColor("black");
					setFormText("");
					router.refresh();
				}
				else {
					setFormColor("red");
					setFormText(result.error);
				}
			}
			const enable_create_recipe = async (data) => {
				data.preventDefault();
				
				setDisplayCreate((
					<div>
						<form onSubmit={create_recipe} style={{textAlign: "center"}}>
							<p style={{textColor: form_color}}>{form_text}</p>
							<label>Recipe Title:</label>
							<input type="text" name="recipe_title" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Cuisine:</label>
							<input type="text" name="cuisine" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Ingredients:</label>
							<input type="text" name="ingredients" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Directions:</label>
							<input type="text" name="directions" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Serving:</label>
							<input type="number" name="serving" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}} min="0" max="4294967295"/>
							<br></br>
							<label>Prep Time:</label>
							<input type="number" name="prep_time" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}} min="0" max="4294967295"/>
							<br></br>
							<label>Cook Time:</label>
							<input type="number" name="cook_time" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}} min="0" max="4294967295"/>
							<br></br>
							<label>Total Time:</label>
							<input type="number" name="total_time" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}} min="0" max="4294967295"/>
							<br></br>
							<label>Notes:</label>
							<input type="text" name="notes" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Food Type:</label>
							<input type="text" name="food_type" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<label>Food Cost:</label>
							<input type="text" name="food_cost" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<br></br>
							<button type="submit" style={{textColor: "black"}}>Create Recipe</button>
							<br></br>
							<br></br>
							<Link href="/" onClick={reset} style={{color: "#0000EE"}}>Back</Link>
						</form>
					</div>
				));
				setDisplayRemove((<div></div>));
			};
			const remove_recipe = async (data) => {
				data.preventDefault();
				
				const result = await deleteRecipe(new FormData(data.target));
		
				if(result.success == true) {
					setDisplayRemove((<div></div>));
					setDisplayFormArea((<div></div>));
					
					setFormColor("black");
					setFormText("");
					
					router.refresh();
				}
				else {
					setFormColor("red");
					setFormText(result.error);
				}
			}
			const enable_remove_recipe = async (data) => {
				data.preventDefault();
				
				setDisplayRemove((
					<div>
						<form onSubmit={remove_recipe} style={{textAlign: "center"}}>
							<p style={{textColor: form_color}}>{form_text}</p>
							<label>Recipe Title:</label>
							<input type="text" name="recipe_title" style={{borderStyle: "solid", borderWidth: "1px", borderColor: form_color, marginBottom: "1px"}}/>
							<br></br>
							<br></br>
							<button type="submit" style={{textColor: "black"}}>Remove Recipe</button>
							<br></br>
							<br></br>
							<Link href="/" onClick={reset} style={{color: "#0000EE"}}>Back</Link>
						</form>
					</div>
				));
				setDisplayCreate((<div></div>));
			};
			return (
				<div className="">
					<div className="topbar" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}}>
						<Link href="/profile"  style={{color: "#0000EE", float: "right"}}>Profile</Link>
						<Link href="/"  onClick={logout} style={{color: "#0000EE", float: "right", marginRight: "5%"}}>Log Out</Link>
						<Link href="/"  onClick={enable_remove_recipe} style={{color: "#0000EE", float: "right", marginRight: "5%"}}>Remove Recipe</Link>
						<Link href="/"  onClick={enable_create_recipe} style={{color: "#0000EE", float: "right", marginRight: "5%"}}>Create Recipe</Link>
						<Dropdown isOpen={isOpenDropDown} onOpenChange={(open) => setDropDownOpen(open)} style={{ float: "right"}}>
							<DropdownTrigger>
								<Button onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)}>{filterSelection.currentKey === undefined ? "All" : filterSelection.currentKey }</Button>
							</DropdownTrigger>
							<DropdownMenu hideSelectedIcon={true} style={{backgroundColor:"green", margin:"0", padding:"0"}} onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)} selectionMode="single" disallowEmptySelection selectedKeys={filterSelection} onSelectionChange={setFilterSelection}>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="All">All</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Recent">Recent</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Low To High Cost">Low To High Cost</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="High To Low Cost">High To Low Cost</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Low To High Time">Low To High Time</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="High To Low Time">High To Low Time</DropdownItem>
								<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Favorites Only">Favorites Only</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<p></p>
					</div>
					{display_form_area}
					<main className="">
						{current_recipes.map((recipe) => (<Recipe recipe={recipe} bisFavorite={isFavorite(recipe.recipe_title)} ftoggleFavorite={toggleFavorite} user={username} addFavorite={addFavorite} removeFavorite={removeFavorite}/>))}
					</main>
					<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
					</footer>
				</div>
			);
		}
	}
	return (
		<div className="">
			<div className="topbar" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}}>
				<Link href="/login" style={{color: "#0000EE", float: "right"}}>Login</Link>
				<Dropdown isOpen={isOpenDropDown} onOpenChange={(open) => setDropDownOpen(open)} style={{ float: "right"}}>
					<DropdownTrigger>
						<Button onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)}>{filterSelection.currentKey === undefined ? "All" : filterSelection.currentKey }</Button>
					</DropdownTrigger>
					<DropdownMenu hideSelectedIcon={true} style={{backgroundColor:"green", margin:"0", padding:"0"}} onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)} selectionMode="single" disallowEmptySelection selectedKeys={filterSelection} onSelectionChange={setFilterSelection}>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="All">All</DropdownItem>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Recent">Recent</DropdownItem>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Low To High Cost">Low To High Cost</DropdownItem>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="High To Low Cost">High To Low Cost</DropdownItem>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="Low To High Time">Low To High Time</DropdownItem>
						<DropdownItem style={{height: "30px", listStyleType: "none", margin:"0", padding:"0"}} key="High To Low Time">High To Low Time</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<p></p>
			</div>
			<main className="">
				{current_recipes.map((recipe) => (<Recipe recipe={recipe} bisFavorite={isFavorite(recipe.recipe_title)} ftoggleFavorite={toggleFavorite} user={username} addFavorite={addFavorite} removeFavorite={removeFavorite}/>))}
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
export async function getServerSideProps(context) {
	const cookie_list = context.req.cookies;

	const recipes = await GetAllRecipes();

	if(cookie_list != {}) {
		const user = cookie_list["LoggedInUser"];
		
		if (user !== undefined) {
			const favorites = await getFavorites(JSON.parse(user).username);
			
			return {
				props: {
					user_logged_in: true,
					username: JSON.parse(user).username,
					recipes: recipes.data.rows,
					unfiltered_recipes: recipes.data.rows,
					favorite_recipes: favorites.data.rows,
				},
			};
		} 
		else {
			return {
				props: {
					user_logged_in: false,
					username: "",
					recipes: recipes.data.rows,
					unfiltered_recipes: recipes.data.rows,
					favorite_recipes: null,
				},
			};
		}
	}
	else {
		return {
			props: {
				user_logged_in: false,
				username: "",
				recipes: recipes.data.rows,
				unfiltered_recipes: recipes.data.rows,
				favorite_recipes: null,
			},
		};
	}
}