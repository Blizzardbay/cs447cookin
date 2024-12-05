import { IoPersonOutline } from "react-icons/io5";
import { removeUserData } from '@/app/util/data';
import { pacifico } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";
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

// TODO: Delete account from database

export default function DeleteAccountBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal

	const router = useRouter();

  // Delete account from database
  // If you remove this function go to line 68 and remove the function from the Button
  const deleteAccount = async () => {
    // Delete recipe from database
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		
		if(str.length >= 2) {
			const result = await removeUserData(decodeURIComponent(str[1]), true);
			
			if(result.success == true) {
				if(result.redirectUrl === undefined) {
					router.push("/");
				}
				else {
					router.push(result.redirectUrl);
				}
			}
		}
      try {
        // Add delete recipe function here (use title variabble to query recipe)
		
        toast.success(`Account has been deleted!`);
      } catch (error) {
        toast.error(`Error deleting account!`);
        console.error(`Error deleting recipe: ${error}`);
      } finally {
        // Debug message
        console.log(`Deleting account!`);
      }
  };

  return (
    <div>
      <Button onClick={onOpen} color="danger" variant="bordered" size="md" startContent={<IoPersonOutline size={24} />}  className="w-fit h-min py-1 px-4 flex flex-row gap-4 justify-center items-center text-lg hover:bg-[#F31260] hover:text-white">
        Delete Account
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
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
                Delete Account
              </ModalHeader>
              <ModalBody>
                <p className="font-medium">
                  Are you sure you want to delete your account?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    deleteAccount();
                    onClose;
                  }}
                  className="text-white bg-black"
                >
                  Delete Account
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
