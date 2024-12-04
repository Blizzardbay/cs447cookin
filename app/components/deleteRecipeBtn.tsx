import { IoCloseOutline } from "react-icons/io5";
import { pacifico } from "@/app/fonts/fonts";
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

// TODO: Delete recipe from database

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
    style?: string;
  };

export default function DeleteRecipeBtn({ recipe, update_main }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal
  const router = useRouter();
  const style = "";
  // Delete recipe from database
  // If you remove this function go to line 87 and remove the function from the Button
  const deleteRecipe1 = async () => {
    // Delete recipe from database
      try {
        // Add delete recipe function here (use title variabble to query recipe)
		
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		
		if(str.length >= 2) {
			if(decodeURIComponent(str[1]) === recipe.creator) {
				const result = await deleteRecipe(recipe.recipe_title);
				update_main(null, "REMOVELIST", null, recipe.recipe_title)
				router.refresh()
			}
		}
        // Code here...
        toast.success(`${recipe.recipe_title} recipe has been deleted!`);
      } catch (error) {
        toast.error(`Error deleting recipe!`);
        console.error(`Error deleting recipe: ${error}`);
      } finally {
        // Debug message
        console.log(`Deleting recipe: ${recipe.recipe_title}`);
      }
  };

  return (
    <div>
      <Button onClick={onOpen} size="sm" variant="flat" className={`${style} w-fit h-min bg-transparent hover:bg-black`}>
        <IoCloseOutline size={36} color="white" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
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
                Delete Recipe
              </ModalHeader>
              <ModalBody>
                <p className="font-medium">
                  Are you sure you want to delete{" "}
                  <span className="font-bold">{recipe.recipe_title}</span>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    deleteRecipe1();
                    onClose();
                  }}
                  className="text-white bg-black"
                >
                  Delete Recipe
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
