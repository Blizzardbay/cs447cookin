'use client';
import { LogOut, insertRecipe, deleteRecipe, GetAllRecipes } from '@/app/util/data';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Recipe from '../app/components/recipe'

export default function Home({user_logged_in, username, recipes}) {
	const router = useRouter();
	
	const [display_create, setDisplayCreate] = useState((<div></div>));
	
    const [display_remove, setDisplayRemove] = useState((<div></div>));
	
	
	const [display_form_area, setDisplayFormArea] = useState((<div></div>));
	
	const [form_color, setFormColor] = useState("black");
    const [form_text, setFormText] = useState("");
	
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
						<p></p>
					</div>
					{display_form_area}
					<main className="">
						{recipes.map((recipe) => (<Recipe recipe={recipe}/>))}
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
				<p></p>
			</div>
			<main className="">
				{recipes.map((recipe) => (<Recipe recipe={recipe}/>))}
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
			return {
				props: {
					user_logged_in: true,
					username: user,
					recipes: recipes.data.rows,
				},
			};
		} 
		else {
			return {
				props: {
					user_logged_in: false,
					username: "",
					recipes: recipes.data.rows,
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
			},
		};
	}
}