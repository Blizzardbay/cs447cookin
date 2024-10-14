import Image from "next/image";
import { FormEvent } from 'react'

export default function Home() {
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
	 
		const formData = new FormData(event.currentTarget)
		const response = await fetch('/api/submit', {
		  method: 'POST',
		  body: formData,
		})
	 
		// Handle response if necessary
		const data = await response.json()
		console.log(data)
	}
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		  <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
			<form onSubmit={onSubmit}>
			  <input type="text" name="name" />
			  <button type="submit">Submit</button>
			</form>
		  </main>
		  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			
		  </footer>
		</div>
	);
}
