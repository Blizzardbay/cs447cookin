import { insertUserData, removeUserData, tryUserLogin } from '@/app/util/data';
import { useRouter, usePathname } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export default function Home({user_logged_in, username}) {
	const router = useRouter();
	
	const [remove_color, setRemoveColor] = useState("black");
    const [remove_text, setRemoveText] = useState("");
	
	const remove = async (data) => {
		data.preventDefault();
		
		const result = await removeUserData(new FormData(data.target), user_logged_in);
		
		if(result.success == true) {
			if(result.redirectUrl === undefined) {
				router.push("/mainpage");
			}
			else {
				router.push(result.redirectUrl);
			}
		}
		else {
			setRemoveColor("red");
			setRemoveText(result.error);
		}
	};
	
	return (
		<div className="" style={{margin: "auto", textAlign: "center"}}>
		  <main className="">
			<form onSubmit={remove} style={{textAlign: "center"}}>
				<p style={{textColor: remove_color}}>{remove_text}</p>
				<input type="text" name="username" style={{borderStyle: "solid", borderWidth: "1px", borderColor: remove_color, marginBottom: "1px"}}/>
				<br></br>
				<button type="submit" style={{textColor: "black"}}>Delete User</button>
			</form>
			<br></br>
			<Link href="/mainpage" style={{color: "#0000EE"}}>Back To Main Page</Link>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}