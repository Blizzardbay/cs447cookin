import { IoFilter } from "react-icons/io5";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

export default function filterBtn() {
  const [filterSelection, setFilterSelection] = useState(new Set(["All"]));

  const selectedValue = useMemo(
    () => Array.from(filterSelection).join(", ").replaceAll("_", " "),
    [filterSelection]
  );

   // Filter recipes from database
   // If you remove this function go to line 48 and remove the function from the onSelectionChange
  const filterRecipes = async (keys) => {
    try {
      // Filter recipes from database
      // Code here...
      toast.success(`Filter ${Array.from(keys).join(", ").toLowerCase()} recipes!`);
    } catch (error) {
      toast.error(`Error filtering recipes!`);
      console.error(`Error filtering recipes: ${error}`);
    } finally {
      // Debug message
      console.log(`Filtering recipes: ${selectedValue}`);
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize w-fit h-10 py-1 px-4 gap-4 justify-center items-center text-lg font-medium text-black border-black hover:bg-black hover:text-white"
        >
          {selectedValue} <IoFilter size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={filterSelection}
        onSelectionChange={(keys) => {
          setFilterSelection(keys);
          filterRecipes(keys);
        }}
      >
        <DropdownItem key="All">All</DropdownItem>
        <DropdownItem key="Recent">Recent</DropdownItem>
        <DropdownItem key="Ascending Cost">Ascending Cost</DropdownItem>
        <DropdownItem key="Descending Cost">Descending Cost</DropdownItem>
        <DropdownItem key="Ascending Time">Ascending Time</DropdownItem>
        <DropdownItem key="Descending Time">Descending Time</DropdownItem>
        <DropdownItem key="Favorites">Favorites</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}