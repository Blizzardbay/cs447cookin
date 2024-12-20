import Home from "../components/home";
import { GetAllRecipes, getFavorites } from '@/app/util/data';
import { cookies } from 'next/headers';

export default async function Page() {
	const data = await GetAllRecipes();

	const cookieStore = await cookies()
 
	const logged_in = cookieStore.get('LoggedInUser')
	
	if(logged_in) {
		// logged_in.value
		const favorites = await getFavorites(logged_in.value);

		if(favorites) {
			if(favorites.data) {
				return (<Home data={data} favorites={favorites.data.rows}/>);
			}
		}
	}

	return (<Home data={data} favorites={null}/>);
}
