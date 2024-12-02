"use client";

import { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { pacifico } from "@/app/fonts/fonts";
import SideBar from "../components/sideBar";
import RecipeGrid from "../components/recipeGrid";
import Header from "../components/header";
import AddRecipeBtn from "../components/addRecipeBtn";

// TODO: Add animation for recipes
// TODO: Add functionality to sideBar (Navigation)
// TODO: Fix the page to view RecipeGrid
// TODO: Handle recipe data and states (useEffect)

// TODO: Create a View Recipe function (Modal)
// TODO: Create a Modify Recipe function (Modal)
// Done: Create a Delete recipe function (Modal)
// Done: Create a Add Recipe function (Modal)
// Done: Create a Favorites page
// Done: Add functionality to header (Search)
// Done: Create a searchBar component for recipes
// Done: Create a useState for recipes and search

export default function Home() {
  // Recipes State
  const [recipes, setRecipes] = useState([
    {
      image: "",
      title: "Grilled Cheese Sandwich",
      cuisine: "American",
      foodType: "Quick & Easy",
      cost: "Low",
      ingredients: ["Bread", "Cheese", "Butter"],
      directions: ["butter bread", "add cheese", "grill"],
      servings: 3,
      prepTime: 2,
      cookTime: 10,
      totalTime: 12,
      favorite: false,
      notes: "this is really good!",
    },
    {
      image: "",
      title: "Grilled Cheese Sandwich",
      cuisine: "",
      foodType: "",
      cost: "",
      ingredients: [],
      directions: [],
      servings: 0,
      prepTime: 0,
      cookTime: 0,
      totalTime: 0,
      favorite: false,
      notes: "",
    },
    {
      image: "",
      title: "Grilled Cheese Sandwich",
      cuisine: "",
      foodType: "",
      cost: "",
      ingredients: [],
      directions: [],
      servings: 0,
      prepTime: 0,
      cookTime: 0,
      totalTime: 0,
      favorite: false,
      notes: "",
    },
    {
      image: "",
      title: "Grilled Cheese Sandwich",
      cuisine: "",
      foodType: "",
      cost: "",
      ingredients: [],
      directions: [],
      servings: 0,
      prepTime: 0,
      cookTime: 0,
      totalTime: 0,
      favorite: false,
      notes: "",
    },
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
            <h2 className={`${pacifico.className} text-3xl`}>Recipes</h2>
            <AddRecipeBtn></AddRecipeBtn>
          </div>
          <RecipeGrid recipes={recipes}></RecipeGrid>
        </div>
      </div>
    </div>
  );
}
