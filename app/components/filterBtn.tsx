import { IoFilter } from "react-icons/io5";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useState, useEffect } from "react";

const FilterBtn = ({ recipes, modifyList, currentfSelection, favorites }) => {
  const [filterSelection, setFilterSelection] = useState(currentfSelection);

	useEffect(() => {
		switch(filterSelection.currentKey) {
				case "My Recipes": {
					const temp = JSON.parse(JSON.stringify(recipes));
					
					const cookie_list = document.cookie;
		
					const str = cookie_list.split("=");
					
					if(str.length >= 2) {
						modifyList(JSON.parse(JSON.stringify(temp.filter(recipe => decodeURIComponent(str[1]) === recipe.creator))), filterSelection);
					}
					break;
				}
				case "Favorites": {
					const temp = JSON.parse(JSON.stringify(recipes));
					
					modifyList(JSON.parse(JSON.stringify(temp.filter(recipe => {
						if(favorites !== null) {
							for(let i = 0; i < favorites.length;i++) {
								if(favorites[i].recipe_title === recipe.recipe_title) {
									return true;
								}
							}
							return false;
						}
					}))), filterSelection);
					break;
				}
				case "Descending Cost": {
					const temp = JSON.parse(JSON.stringify(recipes));
					temp.sort((a, b) => {
						let cost_a = 0;
						let cost_b = 0;
						
						if(a.food_cost === "High") {
							cost_a = 3;
						}
						if(a.food_cost === "Medium") {
							cost_a = 2;
						}
						if(a.food_cost === "Low") {
							cost_a = 1;
						}
						if(b.food_cost === "High") {
							cost_b = 3;
						}
						if(b.food_cost === "Medium") {
							cost_b = 2;
						}
						if(b.food_cost === "Low") {
							cost_b = 1;
						}
						return cost_b - cost_a;
					});
					modifyList(JSON.parse(JSON.stringify(temp)), filterSelection);
					break;
				}
				case "Ascending Cost": {
					const temp = JSON.parse(JSON.stringify(recipes));
					temp.sort((a, b) => {
						let cost_a = 0;
						let cost_b = 0;
						
						if(a.food_cost === "High") {
							cost_a = 3;
						}
						if(a.food_cost === "Medium") {
							cost_a = 2;
						}
						if(a.food_cost === "Low") {
							cost_a = 1;
						}
						if(b.food_cost === "High") {
							cost_b = 3;
						}
						if(b.food_cost === "Medium") {
							cost_b = 2;
						}
						if(b.food_cost === "Low") {
							cost_b = 1;
						}
						return cost_a - cost_b;
					});
					modifyList(JSON.parse(JSON.stringify(temp)), filterSelection);
					break;
				}
				case "Descending Time": {
					const temp = JSON.parse(JSON.stringify(recipes));
					temp.sort((a, b) => {
						return b.total_time - a.total_time;
					});
					modifyList(JSON.parse(JSON.stringify(temp)), filterSelection);
					break;
				}
				case "Ascending Time": {
					const temp = JSON.parse(JSON.stringify(recipes));
					temp.sort((a, b) => {
						return a.total_time - b.total_time;
					});
					modifyList(JSON.parse(JSON.stringify(temp)), filterSelection);
					break;
				}
				case "Recent": {
					const temp = JSON.parse(JSON.stringify(recipes));
					temp.reverse();
					modifyList(JSON.parse(JSON.stringify(temp)), filterSelection);
					break;
				}
				case "All":
				default: {
					modifyList(JSON.parse(JSON.stringify(recipes)), filterSelection);
					break;
				}
			}
	}, [filterSelection])

	const [logged_in, setLoggedIn] = useState(false);
	
	useEffect(() => {
		const cookie_list = document.cookie;
		
		const str = cookie_list.split("=");
		if(str.length >= 2) {
			if(str[0] === "LoggedInUser") {
				setLoggedIn(true);
			}
		}
	}, []);
	
	if(logged_in === true) {
	  return (
		<Dropdown>
		  <DropdownTrigger>
			<Button 
			  variant="bordered" 
			  className="capitalize w-fit h-10 py-1 px-4 gap-4 justify-center items-center text-lg font-medium text-black border-black hover:bg-black hover:text-white"
			>
			  {filterSelection}<IoFilter size={24} />
			</Button>
		  </DropdownTrigger>
		  <DropdownMenu 
			aria-label="Single selection example"
			variant="flat"
			disallowEmptySelection
			selectionMode="single"
			selectedKeys={filterSelection}
			onSelectionChange={setFilterSelection}
		  >
			<DropdownItem key="All">All</DropdownItem>
			<DropdownItem key="Recent">Recent</DropdownItem>
			<DropdownItem key="Ascending Cost">Ascending Cost</DropdownItem>
			<DropdownItem key="Descending Cost">Descending Cost</DropdownItem>
			<DropdownItem key="Ascending Time">Ascending Time</DropdownItem>
			<DropdownItem key="Descending Time">Descending Time</DropdownItem>
			<DropdownItem key="My Recipes">My Recipes</DropdownItem>
			<DropdownItem key="Favorites">Favorites</DropdownItem>
		  </DropdownMenu>
		</Dropdown>
	  );
  }
  return (
		<Dropdown>
		  <DropdownTrigger>
			<Button 
			  variant="bordered" 
			  className="capitalize w-fit h-10 py-1 px-4 gap-4 justify-center items-center text-lg font-medium text-black border-black hover:bg-black hover:text-white"
			>
			  {filterSelection}<IoFilter size={24} />
			</Button>
		  </DropdownTrigger>
		  <DropdownMenu 
			aria-label="Single selection example"
			variant="flat"
			disallowEmptySelection
			selectionMode="single"
			selectedKeys={filterSelection}
			onSelectionChange={setFilterSelection}
		  >
			<DropdownItem key="All">All</DropdownItem>
			<DropdownItem key="Recent">Recent</DropdownItem>
			<DropdownItem key="Ascending Cost">Ascending Cost</DropdownItem>
			<DropdownItem key="Descending Cost">Descending Cost</DropdownItem>
			<DropdownItem key="Ascending Time">Ascending Time</DropdownItem>
			<DropdownItem key="Descending Time">Descending Time</DropdownItem>
		  </DropdownMenu>
		</Dropdown>
	  );
}

export default FilterBtn;