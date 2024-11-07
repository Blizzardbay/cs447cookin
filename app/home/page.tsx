import SideBar from "../components/sideBar"
import AddRecipeBtn from "../components/addRecipeBtn"
import RecipeCard from "../components/recipeCard"

import RecipeImage from "../assets/images/grilled-cheese-sandwich.jpg"

export default function Home() {
    return (
        <div className="max-h-screen w-full flex gap-2 items-center">
            <SideBar></SideBar>
            <div className="px-8 w-full h-screen flex flex-col overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center place-items-center">
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                    <RecipeCard title="Grilled Cheese" image={RecipeImage}></RecipeCard>
                </div>
                <AddRecipeBtn></AddRecipeBtn>
            </div>
        </div>
    )
}