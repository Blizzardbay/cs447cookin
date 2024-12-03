import { pacifico } from "@/app/fonts/fonts";
import { FaRegEdit } from "react-icons/fa";
import Form from "next/form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
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

export default function ModifyRecipeBtn({
  recipe,
  style,
}: RecipeCardProps & RecipeCardStyle) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal

  const [editRecipe, setEditRecipe] = useState({
    image: "",
    title: "",
    cuisine: "",
    foodType: "",
    cost: "",
    ingredients: "",
    directions: "",
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    totalTime: 0,
    notes: "",
  }); // State for editRecipe

  // Add edit recipe to database
  // If you remove this function go to line 305 and remove the function from Button
  const submitRecipe = async () => {
    try {
      // Add editRecipe function here (use editRecipe variable to add editRecipe properties)
      // Code here...
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
      console.log(`Fetching recipes: ${JSON.stringify(editRecipe)}`);
    }
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        className={`${style} w-fit h-min py-1 px-4 flex flex-row gap-4 justify-center items-center text-lg bg-transparent rounded-xl hover:bg-black`}
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
        className="w-[600px] h-fit"
        classNames={{
          header: "text-2xl",
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
                        defaultValue={recipe.title}
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
                        defaultValue={recipe.cuisine || "default"}
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
                        defaultValue={recipe.foodType || "default"}
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
                        defaultValue={recipe.cost || "default"}
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
                          recipe.ingredients?.join(", ")
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
                        defaultValue={recipe.directions?.join(", ")}
                        placeholder="Enter the instructions of your recipe"
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
                        defaultValue={recipe.servings}
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
                        defaultValue={recipe.prepTime}
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
                        defaultValue={recipe.cookTime}
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
                    onClose;
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
