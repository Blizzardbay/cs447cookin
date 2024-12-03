import { IoLogInOutline } from "react-icons/io5";
import { pacifico } from "@/app/fonts/fonts";
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

// TODO: Delete account from database

export default function LogOutBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // State for modal

  // Delete account from database
  // If you remove this function go to line 68 and remove the function from the Button
  const logOutAccount = async () => {
    // Log user out of account
      try {
        // Add delete recipe function here (use title variabble to query recipe)
        // Code here...
        toast.success(`Account has logged out!`);
      } catch (error) {
        toast.error(`Error logging out account!`);
        console.error(`Error deleting recipe: ${error}`);
      } finally {
        // Debug message
        console.log(`Logged out of account!`);
      }
  };

  return (
    <div>
      <Button onClick={onOpen} color="default" variant="bordered" size="md" startContent={<IoLogInOutline size={28} />}  className="w-fit h-min py-1 px-4 flex flex-row gap-4 justify-center items-center text-lg text-start text-black border-black hover:bg-black hover:text-white">
        Log Out
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
                Log Out Account
              </ModalHeader>
              <ModalBody>
                <p className="font-medium">
                  Are you sure you want to log out your account?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    logOutAccount();
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
