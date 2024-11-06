'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function createTables() {
	try {
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
export async function removeUserData(formData: FormData) {
	try {
		if(formData.get("username") !== null) {
			const username = formData.get("username")!.toString();
			await sql`DELETE FROM user_information WHERE username=${username};`;
		}
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
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
		return { success: false, error: "Unable to create cookie. Please contact website administrator." };
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