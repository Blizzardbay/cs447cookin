import RecipeCard from "../components/recipeCard"

type RecipeGridProps = {
    recipes: any;
}

export default function RecipeGrid({recipes}: RecipeGridProps) {
    return (
        <div className="w-full h-[750px] justify-start grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-scroll">
            {recipes.map((recipe: any, index: number) => {
                return <RecipeCard key={index} title={recipe.title} image={recipe.image}></RecipeCard>
            })}
        </div>
    )
}