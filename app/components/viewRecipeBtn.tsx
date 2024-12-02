import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { pacifico } from "@/app/fonts/fonts";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import defaultImage from "../assets/images/defaultImage.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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

// TODO: Finsish View Recipe Modal
// TODO: Add favorite recipe functionality

export default function ViewRecipeBtn({ recipe }: RecipeCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite recipe
  
  // Add favorite recipe to database
  useEffect(() => {
    try {
      // Add favorite recipe to database
      // Code here...
    } catch (error) {
      console.error(`Error adding favorite recipe: ${error}`);
    } finally {
      // Debug message
      console.log(`Adding favorite recipe: ${isFavorite}`);
    }
    
  }, [isFavorite]);

  return (
    <div className="w-full h-full ">
      <Button
        onClick={onOpen}
        size="sm"
        variant="light"
        className="p-0 w-full h-full border-2 border-black rounded-lg"
      >
        <Image
          // Create file path to database image (change the require() path)
          src={recipe.image ? require(`${recipe.image}`) : defaultImage}
          alt={recipe.title ? recipe.title : "Recipe Image"}
          width={600}
          height={400}
          className="object-cover w-full h-full bg-black brightness-[70%] hover:brightness-[55%]"
        />
        <p className="absolute top-[45%] right-[35%] text-xl text-white">
          View Recipe
        </p>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        radius="lg"
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
                className={`${pacifico.className} flex flex-row gap-4`}
                >
                {recipe.title}
                <Button onPress={() => setIsFavorite(!isFavorite)} size="sm" className="bg-transparent">
                  {isFavorite ? (
                  <IoHeart size={32} color="red" />
                  ) : (
                  <IoHeartOutline size={32} color="black" />
                  )}
                </Button>
                </ModalHeader>
              <ModalBody>
                <div className="w-full h-[400px] border-2 border-black rounded-lg">
                  <Image
                    src={recipe.image || defaultImage}
                    alt={recipe.title || "Recipe Image"}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-4 [&>div>h4]:text-lg [&>div>p]:font-semibold [&>div>p]:text-[#3D3D3D] [&>div>div>h4]:text-lg [&>div>div>p]:font-semibold [&>div>div>p]:text-[#3D3D3D]">
                  <div className="grid grid-cols-3 place-content-around text-center">
                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold">Cuisine</h4>
                      <p>{recipe.cuisine}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold">Food Type</h4>
                      <p>{recipe.foodType}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold">Cost</h4>
                      <p>{recipe.cost}</p>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-col gap-2 border-t-1 border-black">
                    <h4 className="font-semibold">Ingredients</h4>
                    <ul className="ml-8 font-semibold text-[#3D3D3D] list-disc">
                      {recipe.ingredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 flex flex-col gap-2 border-t-1 border-black">
                    <h4 className="font-semibold">Directions:</h4>
                    <ol className="ml-4 text-[#3D3D3D]">
                      {recipe.directions?.map((direction, index) => (
                        <div key={index} className="mt-2 flex flex-col gap-1">
                          <p className="font-semibold">Step {index + 1}</p>
                          <li className="font-normal">
                            {direction.charAt(0).toUpperCase() + direction.slice(1)}
                          </li>
                        </div>
                      ))}
                    </ol>
                  </div>
                  <div className="pt-3 flex flex-col gap-2 border-t-1 border-black [&>div]:justify-between [&>div]:px-2 [&>div>h4]:text-lg [&>div>h4]:font-semibold [&>div>p]:text-[#3D3D3D] [&>div>p]:font-medium">
                    <div className="flex flex-row gap-4">
                      <h4 className="font-semibold">Servings</h4>
                      <p>{recipe.servings} serving(s)</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <h4 className="font-semibold">Prep Time</h4>
                      <p>{recipe.prepTime} minutes</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <h4 className="font-semibold">Cook Time</h4>
                      <p>{recipe.cookTime} minutes</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <h4 className="font-semibold">Total Time</h4>
                      <p>{recipe.totalTime} minutes</p>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-col gap-2 border-t-1 border-black">
                    <h4 className="font-semibold">Notes:</h4>
                    <p>{recipe.notes ? recipe.notes.charAt(0).toUpperCase() + recipe.notes.slice(1) : "None"}</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
