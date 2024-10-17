'use client';

import { insertUserData, removeUserData, tryUserLogin } from '@/app/data';

export default function Home() {
	return (
		<div className="">
		  <main className="">
			<form action={insertUserData} style={{margin: "auto", textAlign: "center"}}>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<button type="submit">Create User</button>
			</form>
			<form action={removeUserData} style={{margin: "auto", textAlign: "center"}}>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<button type="submit">Delete User</button>
			</form>
			<form action={tryUserLogin} style={{margin: "auto", textAlign: "center"}}>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<button type="submit">Login</button>
			</form>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
