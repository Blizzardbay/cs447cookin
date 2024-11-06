'use client';
import { LogOut } from '@/app/data';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export default function Home({user_logged_in, username}) {
	const router = useRouter();
	if(user_logged_in) {
		if(user_logged_in === true) {
			const logout = async (data) => {
				data.preventDefault();
				
				const result = await LogOut(username);
				
				if(result.success == true) {
					router.push(result.redirectUrl);
				}
				else {
					setLoginColor("red");
					setLoginText(result.error);
				}
			};
			return (
				<div className="">
					<div className="topbar" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}}>
						<Link href="/"  onClick={logout} style={{color: "#0000EE", float: "right"}}>Log Out</Link>
						<p></p>
					</div>
					<main className="">
						<p>Hello</p>
					</main>
					<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
					</footer>
				</div>
			);
		}
	}
	return (
		<div className="">
			<div className="topbar" style={{margin: "auto", marginBottom: "5%", borderStyle: "solid", borderWidth: "1px", borderColor: "black", width: "50%"}}>
				<Link href="/login" style={{color: "#0000EE", float: "right"}}>Login</Link>
				<p></p>
			</div>
			<main className="">
				<p>Hello</p>
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