'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

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
}
export async function insertRecipe(formData: FormData, creator) {
	try {
		const temp_date = new Date()
		
		const recipe_title = formData.get("recipe_title");
		if(!recipe_title) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Recipe Title. Recipe Title must be non-null and not empty."};
		}
		const cuisine = formData.get("cuisine");
		if(!cuisine) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Cuisine. Cuisine must be non-null and not empty."};
		}
		const ingredients = [formData.get("ingredients")];
		if(!ingredients) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Ingredients. Ingredients must be non-null and not empty."};
		}		
		const directions = [formData.get("directions")];
		if(!directions) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Directions. Directions must be non-null and not empty."};
		}
		const serving = formData.get("serving");
		if(!serving) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Serving. Serving must be non-null and not empty."};
		}
		const prep_time = formData.get("prep_time");
		if(!prep_time) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Prep Time. Prep Time must be non-null and not empty."};
		}
		const cook_time = formData.get("cook_time");
		if(!cook_time) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Cook Time. Cook Time must be non-null and not empty."};
		}
		const total_time = formData.get("total_time");
		if(!total_time) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Total Time. Total Time must be non-null and not empty."};
		}
		const notes = formData.get("notes");
		if(!notes) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Notes. Notes must be non-null and not empty."};
		}
		const food_type = formData.get("food_type");
		if(!food_type) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Food Type. Food Type must be non-null and not empty."};
		}
		const food_cost = formData.get("food_cost");
		if(!food_cost) {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild Food Cost. Food Cost must be non-null and not empty."};
		}
		const creation_date = (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString();
				
		await sql`
			INSERT INTO recipe (recipe_title, cuisine, ingredients, directions, serving, prep_time, cook_time, total_time, notes, creator, creation_date, food_type, food_cost)
			VALUES (${recipe_title}, ${cuisine}, ${ingredients}, ${directions}, ${serving}, ${prep_time}, ${cook_time}, ${total_time}, ${notes}, ${creator}, ${creation_date}, ${food_type}, ${food_cost})
			ON CONFLICT (pid) DO NOTHING;
		`;
		return { success: true, redirectUrl: "/mainpage", error: ""};
	}
	catch (error) {
		return { success: false, redirectUrl: "/mainpage", error: "Invaild form data. Please contact website administrator."};
	}
}
export async function deleteRecipe(formData: FormData) {
	try {
		if(formData.get("recipe_title") !== null) {
			const recipe_title = formData.get("recipe_title")!.toString();
			await sql`DELETE FROM recipe WHERE recipe_title=${recipe_title};`;
			
			return { success: true, redirectUrl: "/mainpage", error: ""};
		}
		else {
			return { success: false, redirectUrl: "/profile", error: "Invaild Recipe Title. Recipe Title must be non-null and not empty."};
		}
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/profile", error: "SQL Error: Please contact website administrator."};
	}

}
export async function GetAllRecipes() {
	try {
		const ret = await sql`SELECT * FROM recipe`;
		
		return { success: true, redirectUrl: "/mainpage", error: "", data: ret};
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/mainpage", error: "SQL Error: Please contact website administrator."};
	}
}
export async function insertUserData(formData: FormData) {
	try {
		const temp_date = new Date()
		if(formData.get("username") !== "" && formData.get("username") !== null) {
			if(formData.get("password") !== "" && formData.get("password") !== null) {
				const username = formData.get("username")!.toString();
		
				const password = await bcrypt.hash(formData.get("password"), 10);
				
				const date = (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString();
				
				await sql`
					INSERT INTO user_information (username, password, creation_date, astableid)
					VALUES (${username}, ${password}, ${date}, ${0})
					ON CONFLICT (pid) DO NOTHING;
					`;
				return { success: true, redirectUrl: "/mainpage", error: ""};
			}
			else {
				return { success: false, redirectUrl: "/mainpage", error: "Invaild password. Password must be non-null and not empty."};
			}
		}
		else {
			return { success: false, redirectUrl: "/mainpage", error: "Invaild username. Password must be non-null and not empty."};
		}
	}
	catch (error) {
		return { success: false, redirectUrl: "/mainpage", error: "Invaild form data. Please contact website administrator."};
	}
}
export async function removeUserData(formData: FormData, user_logged_in) {
	try {
		if(formData.get("username") !== null) {
			const username = formData.get("username")!.toString();
			await sql`DELETE FROM user_information WHERE username=${username};`;
			
			return LogOut(username);
		}
		else {
			return { success: false, redirectUrl: "/profile", error: "Invaild Username. Username must be non-null and not empty."};
		}
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
		return { success: false, redirectUrl: "/profile", error: "SQL Error: Please contact website administrator."};
	}
}
export async function LogOut(username) {
	const response = await fetch('/api/authcookie', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({username : {username}, action: "DESTROY"}),
	});
	
	const result = await response.json();
	
	if(result.success === true) {
		return { success: true, redirectUrl: "/mainpage"};
	}
	else {
		return { success: false, error: "Unable to delete cookie. Please contact website administrator." };
	}
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
								const response = await fetch('/api/authcookie', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({username : {username}, action: "CREATE"}),
								});
								
								const result = await response.json();
								
								if(result.success === true) {
									return { success: true, redirectUrl: "/mainpage"};
								}
								else {
									return { success: false, error: "Unable to create cookie. Please contact website administrator." };
								}
							}
							else {
								return { success: false, error: "Password did not match user on record." };
							}
						}
						else {
							return { success: false, error: "Password or Username not found." };
						}
					}
					else {
						return { success: false, error: "Password or Username not found." };
					}
				}
				catch (error) {
					return { success: false, error: "SQL error occured. Please contact website administrator." };
					console.error(Response.json({ error }, { status: 500 }));
				}
			}
			else {
				return { success: false, error: "Password Required." };
			}
		}
		else {
			return { success: false, error: "Username Required." };
		}
	}
	else {
		return { success: true, redirectUrl: "/mainpage"};
	}
}