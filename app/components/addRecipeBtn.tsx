import { IoAddCircleOutline } from "react-icons/io5";
import { pacifico } from "@/app/fonts/fonts";
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

// TODO: Check if image empty
// TODO: Add recipe to database

export default function AddRecipeBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal

const router = useRouter();

  const [recipe, setRecipe] = useState({
    image: "",
    title: "",
    cuisine: "",
    foodType: "",
    cost: "",
    ingredients: [""],
    directions: [""],
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    totalTime: 0,
    favorite: false,
    notes: "",
  }); // State for recipe

  // Add recipe to database
  // If you remove this function go to line 280 and remove the function from the Button
  const submitRecipe = async () => {
      try {
        // Add recipe function here (use recipe variable to add recipe properties)
        
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		
		if(str.length >= 2) {
			if(str[0] === "LoggedInUser") {
				var temp = JSON.parse(JSON.stringify(recipe));
				
				temp.totalTime = temp.prepTime + temp.cookTime;
				
				const result = await insertRecipe(temp, decodeURIComponent(str[1]))
			}
		}
		window.location.href = '/home';
        toast.success(`${recipe.title} recipe added successfully!`);
      } catch (error) {
        toast.error(`Error adding recipe!`);
        console.error(`Error adding recipe: ${error}`);
      } finally {
        // Debug message
        //console.log(`Fetching recipes: ${JSON.stringify(recipe)}`);
      }
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        variant="bordered"
        className="w-fit h-10 py-1 px-4 gap-4 justify-center items-center text-lg font-medium text-black border-black hover:bg-black hover:text-white"
      >
        Add Recipe <IoAddCircleOutline size={32} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        radius="lg"
        size="2xl"
        className="w-[600px] h-fit"
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
                Create Recipe
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
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) =>
                          setRecipe({ ...recipe, image: e.target.value })
                        }
                        className="w-full h-10 px-2 m-auto text-center border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="title">Recipe Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter the title of your recipe"
                        onChange={(e) =>
                          setRecipe({ ...recipe, title: e.target.value })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="cuisine">Cuisine</label>
                      <select
                        name="cuisine"
                        id="cuisine"
                        defaultValue={"default"}
                        onChange={(e) =>
                          setRecipe({ ...recipe, cuisine: e.target.value })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="American">American</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Greek">Greek</option>
                        <option value="French">French</option>
                        <option value="Thai">Thai</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Italian">Italian</option>
                        <option value="Mediterranean">Mediterranean</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="foodType">Food Type</label>
                      <select
                        name="foodType"
                        id="foodType"
                        defaultValue={"default"}
                        onChange={(e) =>
                          setRecipe({ ...recipe, foodType: e.target.value })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="Meat & Veggies">Meat & Veggies</option>
                        <option value="Fit & Wholesome">Fit & Wholesome</option>
                        <option value="Quick & Easy">Quick & Easy</option>
                        <option value="Comfort Food">Comfort Food</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Keto">Keto</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Intermittent Fasting">
                          Intermittent Fasting
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cost">Cost</label>
                      <select
                        name="cost"
                        id="cost"
                        defaultValue={"default"}
                        onChange={(e) =>
                          setRecipe({ ...recipe, cost: e.target.value })
                        }
                        className="w-full h-10 border-[1px] border-[#808080] rounded-md truncate"
                      >
                        <option value="default" disabled>
                          Please select
                        </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ingredients">Ingredients</label>
                      <textarea
                        name="ingredients"
                        placeholder="Enter the ingredients of your recipe"
                        onChange={(e) =>
                          setRecipe({
                            ...recipe,
                            ingredients: e.target.value.split(","),
                          })
                        }
                        className="w-full h-20 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <label htmlFor="instructions">Instructions</label>
                      <textarea
                        name="instructions"
                        placeholder="Enter the instructions of your recipe"
                        onChange={(e) =>
                          setRecipe({
                            ...recipe,
                            directions: e.target.value.split(","),
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
                        placeholder="e.g. 8"
                        onChange={(e) =>
                          setRecipe({
                            ...recipe,
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
                        placeholder="e.g. 10"
                        onChange={(e) =>
                          setRecipe({
                            ...recipe,
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
                        placeholder="e.g. 15"
                        onChange={(e) =>
                          setRecipe({
                            ...recipe,
                            cookTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-10 px-3 border-[1px] border-[#808080] rounded-md truncate"
                      />
                    </div>
                    <div>
                      <p>
                        <span className="mr-8 font-semibold">Total Time </span>
                        {recipe.cookTime + recipe.prepTime} min
                      </p>
                    </div>
                    <div>
                      <label htmlFor="notes">Notes (Optional)</label>
                      <textarea
                        name="notes"
                        placeholder="Enter notes for your recipe"
                        onChange={(e) =>
                          setRecipe({ ...recipe, notes: e.target.value })
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
                    setRecipe({
                      ...recipe,
                      totalTime: recipe.cookTime + recipe.prepTime,
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
