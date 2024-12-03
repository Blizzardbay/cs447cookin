"use client";

import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Favorite() {
  // Recipes State
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    try {
      // Fetch recipes from database
      // Code here...
      toast.success(`Recipes fetched!`);
    } catch (error) {
      toast.error(`Error fetching recipes!`);
      console.error(`Error fetching recipes: ${error}`);
    } finally {
      // Debug message
      console.log(`Fetching recipes: ${recipes}`);
    }
  }, [recipes]);

  return (
    <div className="h-screen min-w-[768px] w-full flex items-center overflow-hidden">
      <SideBar></SideBar>
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="px-8 pt-4 pb-8 w-full grow flex flex-col gap-4">
          <div className="pb-4 w-full h-16 flex flex-row justify-between items-center border-b-2">
            <h2 className={`${pacifico.className} text-3xl`}>
              Favorite Recipes
            </h2>
          </div>
          <RecipeGrid recipes={recipes}></RecipeGrid>
        </div>
      </div>
    </div>
  );
}
