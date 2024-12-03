'use client';

import { insertUserData } from '@/app/util/data';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
	const router = useRouter();
	
	const [create_color, setCreateColor] = useState("black");
    const [create_text, setCreateText] = useState("");
	
	const createAccount = async (data) => {
		data.preventDefault();
		
		const result = await insertUserData(new FormData(data.target));
		
		if(result.success == true) {
			router.push(result.redirectUrl);
		}
		else {
			setCreateColor("red");

			setCreateText(result.error);
		}
	};

	return (
		<div className="" style={{margin: "auto", textAlign: "center"}}>
			<main className="">
				<form onSubmit={createAccount} style={{textAlign: "center"}}>
					<p style={{color:"red"}}>{create_text}</p>
					<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: create_color, marginBottom: "1px"}}/>
					<br></br>
					<input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: create_color, marginBottom: "1px"}}/>
					<br></br>
					<button type="submit" style={{textColor: create_color}}>Create User</button>
				</form>
				<br></br>
				<Link href="/login" style={{color: "#0000EE", textAlign: "center"}}>Back To Log In</Link>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
