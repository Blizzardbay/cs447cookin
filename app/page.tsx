'use client';
import { FormEvent } from 'react'

export default function Home() {
	async function userCreate(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
	 
		const formData = new FormData(event.currentTarget)
		//const response = await fetch('/app/submit', {
		 // method: 'POST',
		  //body: formData,
		//})
		
		const temp_date = new Date()
		
		const user_table = {
			"username" : formData.get("username"),
			"password" : formData.get("password"),
			"creation_date" : (temp_date.getMonth() + 1).toString() + "/" + temp_date.getDate().toString() + "/" + temp_date.getFullYear().toString() + " " + temp_date.getHours().toString() + ":" + temp_date.getMinutes().toString() + ":" + temp_date.getSeconds().toString(),
			"associatedtable" : 0
		}
		
		// Handle response if necessary
		// const data = await response.json()
		console.log(user_table)
	}
	async function userDestroy(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
	 
		/*const formData = new FormData(event.currentTarget)
		const response = await fetch('/app/submit', {
		  method: 'POST',
		  body: formData,
		})
		
		*/
	}
	return (
		<div className="">
		  <main className="">
			<form onSubmit={userCreate} style={{margin: "auto", textAlign: "Center"}}>
			  <input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <button type="createUser">Create User</button>
			</form>
			<form onSubmit={userDestroy} style={{margin: "auto", textAlign: "Center"}}>
			  <input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
			  <br></br>
			  <button type="deleteUser">Delete User</button>
			</form>
		  </main>
		  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			
		  </footer>
		</div>
	);
}
