import { insertUserData, removeUserData, tryUserLogin } from '@/app/data';
import { useRouter, usePathname } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export default function Home({user_logged_in, username}) {
	const router = useRouter();
	
	const [login_color, setLoginColor] = useState("black");
    const [login_text, setLoginText] = useState("");
	
	if(user_logged_in == true) {
		router.back()
	}
	
	const login = async (data) => {
		data.preventDefault();
		
		const result = await tryUserLogin(new FormData(data.target), user_logged_in);
		
		if(result.success == true) {
			router.push(result.redirectUrl);
		}
		else {
			setLoginColor("red");
			setLoginText(result.error);
		}
	};
	const remove = async (data) => {
		data.preventDefault();
		
		const result = await removeUserData(new FormData(data.target));
	};
	
	return (
		<div className="" style={{margin: "auto", textAlign: "center"}}>
		  <main className="">
			<form onSubmit={remove} style={{textAlign: "center"}}>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: "black", marginBottom: "1px"}}/>
				<br></br>
				<button type="submit" style={{textColor: "black"}}>Delete User</button>
			</form>
			<form onSubmit={login} style={{textAlign: "center"}}>
				<p style={{textColor: login_color}}>{login_text}</p>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: login_color, marginBottom: "1px"}}/>
				<br></br>
				<input type="text" name="password" style={{borderStyle: "solid", borderWidth: "1px", borderColor: login_color, marginBottom: "1px"}}/>
				<br></br>
				<button type="submit" style={{textColor: "black"}}>Log In</button>
			</form>
			<br></br>
			<Link href="/createaccount" style={{color: "#0000EE"}}>Don't have an Account? Create one!</Link>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
export async function getServerSideProps(context) {
	const cookie_list = context.req.cookies;

	if(cookie_list != {}) {
		const user = cookie_list["LoggedInUser"];
		
		if (user !== undefined) {
			return {
				props: {
					user_logged_in: true,
					username: user,
				},
			};
		} 
		else {
			return {
				props: {
					user_logged_in: false,
					username: "",
				},
			};
		}
	}
	else {
		return {
			props: {
				user_logged_in: false,
				username: "",
			},
		};
	}
}
