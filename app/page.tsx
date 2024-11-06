'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export default function Home() {
	const router = useRouter();
	
	router.push("/mainpage");
	
	const [dots, setDots] = useState("");

	const interval = setInterval(() => {
		setDots(dots.concat("."));
		if(dots.length > 2) {
			setDots("");
		}
	}, 1000);
	
	
	useEffect(() => {
		return () => clearInterval(interval);
	}, []);
	
	return (
		<div>
			<h1 style={{ fontSize: "60px", color:"#0000EE", textAlign: "center", marginTop: "20%", position: "abosolute"}}>Loading {dots}</h1>
		</div>
	);
}