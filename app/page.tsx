'use client';
import { FormEvent } from 'react'
import { UserInformation, insertData, removeData } from './data'
import bcrypt from 'bcryptjs';

export default function Home() {
	async function userCreate(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
	 
		const formData = new FormData(event.currentTarget)
		
		const temp_date = new Date()
		
		const user_table = new UserInformation(
			formData.get("username"),
			bcrypt.hash(formData.get("password"), 10),
			(temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString(),
			0
		);
		console.log(process.env.POSTGRES_URL);
		await insertData(user_table);
	}
	async function userDestroy(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
	 
		const formData = new FormData(event.currentTarget)
	 
		await removeData(formData.get("username"));
	}
	
	return (
		<div className="">
		  <main className="">
			<form onSubmit={userCreate} style={{margin: "auto", textAlign: "center"}}>
			  <input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <button type="submit">Create User</button>
			</form>
			<form onSubmit={userDestroy} style={{margin: "auto", textAlign: "center"}}>
			  <input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <button type="submit">Delete User</button>
			</form>
		  </main>
		  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			
		  </footer>
		</div>
	);
}
