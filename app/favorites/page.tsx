"use client";

import { useState, useEffect } from "react";
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";

import RecipeImage from "../assets/images/grilled-cheese-sandwich.jpg";

export default function Home() {
  // Recipes State
  const [recipes, setRecipes] = useState([
    { title: "Grilled Cheese Sandwich", image: RecipeImage },
  ]);
  // Search State
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch recipes from database
    // Debug message
    console.log(`Fetching recipes: ${recipes}`);
    console.log(`Search input: ${search}`);
  }, [search, recipes]);

  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header search={search} setSearch={setSearch}></Header>
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
          <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
            <h2 className={`${pacifico.className} text-3xl`}>Favorite Recipes</h2>
          </div>
          <RecipeGrid recipes={recipes}></RecipeGrid>
        </div>
      </div>
    </div>
  );
}
