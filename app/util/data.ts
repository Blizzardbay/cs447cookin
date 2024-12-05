'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import fs from 'fs';

export async function createTables() {
	/*try {
		await sql`BEGIN`;
		await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		await sql`
		 CREATE TABLE IF NOT EXISTS user_information (
		   pid UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
		   username VARCHAR(255) NOT NULL UNIQUE,
		   password TEXT NOT NULL,
		   creation_date TEXT NOT NULL,
		   astableid integer NULL
		 );
		 `;
		await sql`COMMIT`;
		
		return Response.json("ALL GOOD");
	}
	catch (error) {
		await sql`ROLLBACK`;
		return Response.json({ error }, { status: 500 });
	}*/
	/*try {
		await sql`BEGIN`;
		await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		await sql`
		 CREATE TABLE IF NOT EXISTS recipe (
		   pid UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
		   recipe_title TEXT NOT NULL UNIQUE,
		   cuisine TEXT NOT NULL,
		   ingredients TEXT [],
		   directions TEXT [],
		   serving integer NULL,
		   prep_time integer NULL,
		   cook_time integer NULL,
		   total_time integer NULL,
		   notes TEXT NOT NULL,
		   creator integer NULL,
		   creation_date TEXT NOT NULL,
		   food_type TEXT NOT NULL,
		   food_cost TEXT NOT NULL
		 );
		 `;
		await sql`COMMIT`;
		
		return Response.json("ALL GOOD");*/
	//}
	//catch (error) {
		//await sql`ROLLBACK`;
		//return Response.json({ error }, { status: 500 });
	//}
	/*try {
		await sql`BEGIN`;
		await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		await sql`
		 CREATE TABLE IF NOT EXISTS favorite_table (
		   pid UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
		   username VARCHAR(255) NOT NULL,
		   recipe_title TEXT NOT NULL
		 );
		 `;
		await sql`COMMIT`;
		
		return Response.json("ALL GOOD");
	}
	catch (error) {
		await sql`ROLLBACK`;
		return Response.json({ error }, { status: 500 });
	}*/
}
export async function toggleFavorite(toggle, user, recipe) {
	if(toggle === true) {
		return newFavorite(user, recipe);
	}
	else {
		return removeFavorite(user, recipe);
	}
}
export async function isFavorite(user, recipe) {
	if(user === null) {
		return false;
	}
	else {
		const result = await sql`SELECT * FROM favorite_table WHERE username=${user} AND recipe_title=${recipe};`;
		
		if(result) {
			return true;
		}
		else {
			return false;
		}
	}
	
}
export async function getFavorites(user) {
	try {
		const ret = await sql`SELECT * FROM favorite_table WHERE username=${user};`;
		
		return { success: true, redirectUrl: "/home", error: "", data: ret};
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/home", error: "SQL Error: Please contact website administrator."};
	}
}
export async function newFavorite(user, recipe) {
	try {
		await sql`
				INSERT INTO favorite_table (username, recipe_title)
				VALUES (${user}, ${recipe})
				ON CONFLICT (pid) DO NOTHING;
			`;
		return { success: true, redirectUrl: "/home", error: ""};
	}
	catch (error) {
		return { success: false, redirectUrl: "/home", error: "Unable to favorite. Please contact website administrator."};
	}
}
export async function removeFavorite(user, recipe) {
	try {
		await sql`DELETE FROM favorite_table WHERE username=${user} AND recipe_title=${recipe};`;
			
		return { success: true, redirectUrl: "/home", error: ""};
	}
	catch (error) {
		return { success: false, redirectUrl: "/home", error: "Unable to delete favorite. Please contact website administrator."};
	}
}
export async function insertRecipe(data, creator) {
	try {
		const temp_date = new Date()
		
		const recipe_title = data.title;
		if(!recipe_title) {
			return { success: false, redirectUrl: "/home", error: "Invaild Recipe Title. Recipe Title must be non-null and not empty."};
		}
		const cuisine = data.cuisine;
		if(!cuisine) {
			return { success: false, redirectUrl: "/home", error: "Invaild Cuisine. Cuisine must be non-null and not empty."};
		}
		const ingredients = JSON.parse(JSON.stringify(data.ingredients));
		if(!ingredients) {
			return { success: false, redirectUrl: "/home", error: "Invaild Ingredients. Ingredients must be non-null and not empty."};
		}		
		const directions = JSON.parse(JSON.stringify(data.directions));
		if(!directions) {
			return { success: false, redirectUrl: "/home", error: "Invaild Directions. Directions must be non-null and not empty."};
		}
		const serving = data.servings;
		if(!serving) {
			return { success: false, redirectUrl: "/home", error: "Invaild Serving. Serving must be non-null and not empty."};
		}
		const prep_time = data.prepTime;
		if(!prep_time) {
			return { success: false, redirectUrl: "/home", error: "Invaild Prep Time. Prep Time must be non-null and not empty."};
		}
		const cook_time = data.cookTime;
		if(!cook_time) {
			return { success: false, redirectUrl: "/home", error: "Invaild Cook Time. Cook Time must be non-null and not empty."};
		}
		const total_time = data.totalTime;
		if(!total_time) {
			return { success: false, redirectUrl: "/home", error: "Invaild Total Time. Total Time must be non-null and not empty."};
		}
		var notes = data.notes;
		if(notes === "") {
			notes = " ";
		}
		if(!notes) {
			console.log("FAIL------------------------")
			return { success: false, redirectUrl: "/home", error: "Invaild Notes. Notes must be non-null and not empty."};
		}
		const food_type = data.foodType;
		if(!food_type) {
			return { success: false, redirectUrl: "/home", error: "Invaild Food Type. Food Type must be non-null and not empty."};
		}
		const food_cost = data.cost;
		if(!food_cost) {
			return { success: false, redirectUrl: "/home", error: "Invaild Food Cost. Food Cost must be non-null and not empty."};
		}
		const creation_date = (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString();
		
		const image_data = fs.readFileSync(data.image);
		
		if(image_data) {
			console.log("works")
		}
		else {
			console.log("does not work")
		}
		/*
		await sql`
			INSERT INTO recipe (recipe_title, cuisine, ingredients, directions, serving, prep_time, cook_time, total_time, notes, creator, creation_date, food_type, food_cost)
			VALUES (${recipe_title}, ${cuisine}, ${ingredients}, ${directions}, ${serving}, ${prep_time}, ${cook_time}, ${total_time}, ${notes}, ${creator}, ${creation_date}, ${food_type}, ${food_cost})
			ON CONFLICT (pid) DO NOTHING;
		`;*/
		
		return { success: true, redirectUrl: "/home", error: ""};
	}
	catch (error) {
		console.log(error)
		return { success: false, redirectUrl: "/home", error: "Invaild form data. Please contact website administrator."};
	}
}
export async function deleteRecipe(title) {
	try {
		const recipe_title = title;
		await sql`DELETE FROM recipe WHERE recipe_title=${recipe_title};`;
		await sql`DELETE FROM favorite_table WHERE recipe_title=${recipe_title};`;
		
		return { success: true, redirectUrl: "/home", error: ""};
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/profile", error: "SQL Error: Please contact website administrator."};
	}

}
export async function GetAllRecipes() {
	try {
		const ret = await sql`SELECT * FROM recipe`;
		
		const data = ret.rows.map((row) => ({
			...row,
		}));
		
		return { success: true, redirectUrl: "/home", error: "", data };
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/home", error: "SQL Error: Please contact website administrator."};
	}
}
export async function insertUserData(formData: FormData) {
	try {
		const temp_date = new Date()

		const user_name = formData.get("username")?.toString()

		if(user_name !== "" && user_name) {
			const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			
			if(email_regex.test(user_name)) {
				const first = user_name.lastIndexOf("@");
				const second = user_name.lastIndexOf(".");
				
				const email_website = user_name.substring(first + 1, second);
				
				const email_domain = user_name.substring(second + 1, user_name.length);
				
				switch(email_website) {
					case "icloud": {
						if(email_domain !== "com") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					case "gmail": {
						if(email_domain !== "com") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					case "outlook": {
						if(email_domain !== "com") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					case "yahoo": {
						if(email_domain !== "com") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					case "aol": {
						if(email_domain !== "com") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					case "umbc": {
						if(email_domain !== "edu") {
							return { success: false, redirectUrl: "/", error: "Invaild email domain."};
						}
						break;
					}
					default: {
						return { success: false, redirectUrl: "/", error: "Invaild email website."};
					}
				}
				
				const pass_word = formData.get("password")?.toString()

				if(pass_word !== "" && pass_word) {
					if(pass_word.length >= 9) {
						const password_regex = /((\w)*(\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\=|\+|\[|\]|\{|\}|\\|\||\;|\:|\"|\'|\,|\<|\.|\>|\/|\?)+(\w)*)+/;
						
						if(password_regex.test(pass_word)) {
							const username = formData.get("username")!.toString();
			
							const password = await bcrypt.hash(formData.get("password"), 10);
							
							const date = (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString();
							
							await sql`
								INSERT INTO user_information (username, password, creation_date, astableid)
								VALUES (${username}, ${password}, ${date}, ${0})
								ON CONFLICT (pid) DO NOTHING;
								`;
							return { success: true, redirectUrl: "/", error: ""};
						}
						else {
							return { success: false, redirectUrl: "/", error: "Invaild password. Password must contain atleast 1 special character."};
						}
					}
					else {
						return { success: false, redirectUrl: "/", error: "Invaild password. Password must be greater than 8 characters."};
					}
				}
				else {
					return { success: false, redirectUrl: "/", error: "Invaild password."};
				}
			}
			else {
				return { success: false, redirectUrl: "/", error: "Invaild email."};
			}
		}
		else {
			return { success: false, redirectUrl: "/", error: "Invaild email."};
		}
	}
	catch (error) {
		return { success: false, redirectUrl: "/", error: "Invaild form data. Please contact website administrator."};
	}
}
export async function removeUserData(username, user_logged_in) {
	try {
		await sql`DELETE FROM user_information WHERE username=${username};`;
		await sql`DELETE FROM favorite_table WHERE username=${username};`;
		
		return LogOut();
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/", error: "SQL Error: Please contact website administrator."};
	}
}
export async function LogOut() {
	const cookieStore = await cookies()
 
	cookieStore.delete('LoggedInUser')
	
	return { success: true, redirectUrl: "/"};
}
export async function tryUserLogin(formData: FormData, is_logged_in) {
	if(is_logged_in === false) {
		if(formData.get("username") !== null) {
			if(formData.get("password") !== null) {
				const username = formData.get("username")!.toString();
				const password = formData.get("password")!.toString();

				const password_processed = await bcrypt.hash(password, 10);
				
				try {
					const value = await sql`SELECT password FROM user_information WHERE username=${username}`;
					
					if(value.rows !== undefined) {
						if(value.rows.length !== 0) {
							const res1 = await bcrypt.compare(password, value.rows[0].password);
							const res2 = await bcrypt.compare(password, password_processed);
							
							if(res1 === true && res2 === true) {
								const cookieStore = await cookies()
 
								cookieStore.set('LoggedInUser', username, { secure: true })
								
								return { success: true, redirectUrl: "/home"};
							}
							else {
								return { success: false, error: "Password did not match user on record." };
							}
						}
						else {
							return { success: false, error: "Password or Email not found." };
						}
					}
					else {
						return { success: false, error: "Password or Email not found." };
					}
				}
				catch (error) {
					console.error(error);
					return { success: false, error: "SQL error occured. Please contact website administrator." };
				}
			}
			else {
				return { success: false, error: "Password Required." };
			}
		}
		else {
			return { success: false, error: "Email Required." };
		}
	}
	else {
		return { success: true, redirectUrl: "/home"};
	}
}