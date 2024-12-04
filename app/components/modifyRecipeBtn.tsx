import { pacifico } from "@/app/fonts/fonts";
import { FaRegEdit } from "react-icons/fa";
import Form from "next/form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LogOut, insertRecipe, deleteRecipe, GetAllRecipes, toggleFavorite, getFavorites } from '@/app/util/data';
import { useRouter } from "next/navigation";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

// TODO: Modify recipe from database

type RecipeCardProps = {
  recipe: {
    image?: string;
    title?: string;
    cuisine?: string;
    foodType?: string;
    cost?: string;
    ingredients?: string[];
    directions?: string[];
    servings?: number;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    favorite?: boolean;
    notes?: string;
  };
};

type RecipeCardStyle = {
  style: string;
};

export default function ModifyRecipeBtn({recipe, style, update_main}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal

const router = useRouter();

  const [editRecipe, setEditRecipe] = useState({
    image: "",
    title: "",
    cuisine: "",
    foodType: "",
    cost: "",
    ingredients: [],
    directions: [],
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    totalTime: 0,
    notes: "",
  }); // State for editRecipe

  useEffect(() => {
	var temp = JSON.parse(JSON.stringify(editRecipe));
	temp.title = recipe.recipe_title;
	temp.cuisine = recipe.cuisine;
	temp.foodType = recipe.food_type;
	temp.cost = recipe.food_cost;
	if(recipe.ingredients.length > 1) {
		temp.ingredients = recipe.ingredients;
	}
	else {
		temp.ingredients = recipe.ingredients[0].split(",");
	}
	if(recipe.directions.length > 1) {
		temp.directions = recipe.directions;
	}
	else {
		temp.directions = recipe.directions[0].split(",");
	}
	temp.servings = recipe.serving;
	temp.prepTime = recipe.prep_time;
	temp.cookTime = recipe.cook_time;
	temp.totalTime = recipe.total_time;
	temp.notes = recipe.notes;
	
    setEditRecipe(temp);
  }, [recipe]);
  // Add edit recipe to database
  // If you remove this function go to line 305 and remove the function from Button
  const submitRecipe = async () => {
    try {
      // Add editRecipe function here (use editRecipe variable to add editRecipe properties)
      
	  
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		
		if(str.length >= 2) {
			if(str[0] === "LoggedInUser" && decodeURIComponent(str[1]) === recipe.creator) {
				const result1 = await deleteRecipe(recipe.recipe_title);
				
				var temp = JSON.parse(JSON.stringify(editRecipe));
				
				temp.totalTime = temp.prepTime + temp.cookTime;
				
				const result2 = await insertRecipe(temp, decodeURIComponent(str[1]))
				
				update_main(null, "MODIFY", JSON.parse(JSON.stringify(temp)), recipe.recipe_title);
				
				router.refresh()
			}
		}
	  
      toast.success(
        `${
          editRecipe.title ? editRecipe.title : recipe.title
        } recipe has been edited!`
      );
    } catch (error) {
      toast.error(`Error editing recipe!`);
      console.error(`Error adding editRecipe: ${error}`);
    } finally {
      // Debug message
     // console.log(`Fetching recipes: ${JSON.stringify(editRecipe)}`);
    }
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        variant="flat"
        className={`${style} w-fit h-9 py-1 px-4 flex flex-row gap-4 justify-center items-center text-lg bg-transparent hover:bg-black`}
      >
        <p className="text-white font-semibold">Edit</p>
        <FaRegEdit size={28} color="white" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        radius="lg"
        size="2xl"
        className="w-[600px] h-fit select-none"
        classNames={{
          header: "text-3xl",
          closeButton: "text-black text-3xl top-2 right-2",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={`${pacifico.className} flex flex-col gap-1`}
              >
                Edit Recipe
              </ModalHeader>
              <ModalBody>
                {/* Create form (action prop navigates to the same route '/home')*/}
                <Form action="">
                  <div className="flex flex-col gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>label]:font-semibold [&>div>textarea]:px-2 [&>div>textarea]:py-1 [&>div>textarea]:text-wrap [&>div>select]:px-2">
                    <div>
                      <label htmlFor="image">Image</label>
                      {/* Check if empty after submit then add image */}
                      <input
                        type="file"
                        name="image"
                        placeholder="Enter new image"
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            image: e.target.value,
                          })
                        }
                        className="w-full h-10 px-2 m-auto text-center border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="title">Recipe Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={recipe.recipe_title}
                        placeholder="Enter the title of your recipe"
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            title: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="cuisine">Cuisine</label>
                      <select
                        name="cuisine"
                        id="cuisine"
                        defaultValue={editRecipe.cuisine || "default"}
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            cuisine: e.target.value,
                          })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="american">American</option>
                        <option value="chinese">Chinese</option>
                        <option value="mexican">Mexican</option>
                        <option value="japanese">Japanese</option>
                        <option value="greek">Greek</option>
                        <option value="french">French</option>
                        <option value="thai">Thai</option>
                        <option value="spanish">Spanish</option>
                        <option value="italian">Italian</option>
                        <option value="mediterranean">Mediterranean</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="foodType">Food Type</label>
                      <select
                        name="foodType"
                        id="foodType"
                        defaultValue={editRecipe.foodType || "default"}
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            foodType: e.target.value,
                          })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="meat+veggies">Meat & Veggies</option>
                        <option value="fit+wholesome">Fit & Wholesome</option>
                        <option value="quick+easy">Quick & Easy</option>
                        <option value="comfortFood">Comfort Food</option>
                        <option value="desserts">Desserts</option>
                        <option value="keto">Keto</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="glutenFree">Gluten-Free</option>
                        <option value="intermittentFasting">
                          Intermittent Fasting
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cost">Cost</label>
                      <select
                        name="cost"
                        id="cost"
                        defaultValue={editRecipe.cost || "default"}
                        onChange={(e) =>
                          setEditRecipe({ ...editRecipe, cost: e.target.value })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ingredients">Ingredients</label>
                      <textarea
                        name="ingredients"
                        defaultValue={
                          Array.isArray(editRecipe.ingredients) ? (editRecipe.ingredients?.join(", ") ||
                          "Enter the ingredients of your editRecipe") : editRecipe.ingredients
                        }
                        placeholder="Enter the ingredients of your recipe"
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            ingredients: e.target.value,
                          })
                        }
                        className="w-full h-20 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="instructions">Instructions</label>
                      <textarea
                        name="instructions"
                        defaultValue={
							Array.isArray(editRecipe.directions) ? (editRecipe.directions?.join(", ") ||
                          "Enter the ingredients of your editRecipe") : editRecipe.directions
                        }
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            directions: e.target.value,
                          })
                        }
                        className="w-full h-20 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="servings">Servings</label>
                      <input
                        type="number"
                        name="servings"
                        defaultValue={editRecipe.servings?.toString() || "e.g. 8"}
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            servings: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="prepTime">Prep Time (min)</label>
                      <input
                        type="number"
                        name="prepTime"
                        defaultValue={editRecipe.prepTime?.toString() || "e.g. 10"}
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            prepTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="cookTime">Cook Time (min)</label>
                      <input
                        type="number"
                        name="cookTime"
                        defaultValue={editRecipe.cookTime?.toString() || "e.g. 15"}
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            cookTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <p>
                        <span className="mr-8 font-semibold">Total Time </span>
                        {editRecipe.cookTime + editRecipe.prepTime} min
                      </p>
                    </div>
                    <div>
                      <label htmlFor="notes">Notes (Optional)</label>
                      <textarea
                        name="notes"
                        defaultValue={recipe.notes}
                        placeholder="Enter notes for your recipe"
                        onChange={(e) =>
                          setEditRecipe({
                            ...editRecipe,
                            notes: e.target.value,
                          })
                        }
                        className="w-full h-20 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    setEditRecipe({
                      ...editRecipe,
                      totalTime: editRecipe.cookTime + editRecipe.prepTime,
                    });
                    submitRecipe();
                    onClose();
                  }}
                  className="text-white bg-black"
                >
                  Submit Recipe
                </Button>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
