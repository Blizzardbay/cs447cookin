import {pacifico} from '@/app/fonts/fonts'
import SideBar from "../components/sideBar"
import RecipeGrid from "../components/recipeGrid"
import Header from "../components/header"
import AddRecipeBtn from "../components/addRecipeBtn"
import RecipeImage from "../assets/images/grilled-cheese-sandwich.jpg"


export default function Home() {
    const recipes = [
        {title: "Grilled Cheese Sandwich", image: RecipeImage},
    ]
    
    return (
        <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
            <SideBar></SideBar>
            <div className="w-full h-full flex flex-col">
                <Header></Header>
                <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
                    <div className='pb-4 w-full flex flex-row justify-between items-center border-b-2'>
                        <h2 className={`${pacifico.className} text-3xl`}>Recipes</h2>
                        <AddRecipeBtn></AddRecipeBtn>
                    </div>
                    <RecipeGrid recipes={recipes}></RecipeGrid>
                </div>
            </div>
        </div>
    )
}