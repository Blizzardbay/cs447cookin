'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

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
		if(formData.get("username") !== null) {
			if(formData.get("password") !== null) {
				const username = formData.get("username")!.toString();
		
				const password = await bcrypt.hash(formData.get("password"), 10);
				
				const date = (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString();
				
				await sql`
					INSERT INTO user_information (username, password, creation_date, astableid)
					VALUES (${username}, ${password}, ${date}, ${0})
					ON CONFLICT (pid) DO NOTHING;
					`;
			}
		}
	}
	catch (error) {
		console.error(Response.json({ error }, { status: 500 }));
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
export async function tryUserLogin(formData: FormData) {
	if(formData.get("username") !== null) {
		if(formData.get("password") !== null) {
			const username = formData.get("username")!.toString();
			const password = formData.get("password")!.toString();

			const password_processed = await bcrypt.hash(password, 10);
			
			try {
				const value = await sql`SELECT password FROM user_information WHERE username=${username}`;
				
				if(value.rows !== undefined) {
					if(value.rows.length !== 0) {
						bcrypt.compare(password, value.rows[0].password, (error, res1) => {
							if(error) {
								throw error;
							}
							else {
								bcrypt.compare(password, password_processed, (error, res2) => {
									if(error) {
										throw error;
									}
									else {
										if(res1 === true && res2 === true) {
											console.log("User:" + username + " has successfully logged in!")
										}
									}
								});
							}
						});
					}
				}
			}
			catch (error) {
				console.error(Response.json({ error }, { status: 500 }));
			}
		}
	}
}