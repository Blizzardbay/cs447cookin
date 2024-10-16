import { sql } from '@vercel/postgres';

export class UserInformation {
	username : string;
	password : string;
	creation_date : string;
	associated_table : int;
	constructor(username, password, creation_date, associated_table) {
		this.username = username;
		this.password = password;
		this.creation_date = creation_date;
		this.associated_table = associated_table;
	}
}
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
		
		return Response.json();
	}
	catch (error) {
		await sql`ROLLBACK`;
		return Response.json({ error }, { status: 500 });
	}
	
}
export async function insertData(data) {
	try {
		await sql`BEGIN`;
		await sql`
			INSERT INTO users (username, password, creation_date, astableid)
			VALUES (${data.username}, ${data.password}, ${data.creation_date}, ${data.associated_table})
			ON CONFLICT (pid) DO NOTHING;
			`;
		await sql`COMMIT`;
	}
	catch (error) {
		await sql`ROLLBACK`;
		return Response.json({ error }, { status: 500 });
	}
}
export async function removeData(user) {
	try {
		await sql`
				DELETE FROM user_information WHERE username=${user};
				`;
	}
	catch (error) {
		await sql`ROLLBACK`;
		return Response.json({ error }, { status: 500 });
	}
}