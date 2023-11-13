import React from "react";
import { Button } from "../ui/button";

const serviceCategories = [
	"Home Services",
	"Pet Care",
	"Gardening and Outdoor Tasks",
	"Childcare",
	"Community Events",
	"Transportation",
	"Emergency Assistance",
	"Technology Assistance",
	"Wellness and Fitness",
	"Art and Creativity",
	"Language Exchange",
	"Community Support",
	"Local Business Support",
	"Educational Support",
	"Sustainable Living",
];

const CategoryMenu = () => {
	return (
		<div className="border border-y">
			<div className="max-w-5xl m-auto">
				<div className="flex gap-2 flex-wrap py-4">
					{serviceCategories.map((name, idx) => (
						<div className="" key={idx}>
							<Button variant="default" className="">{name}</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryMenu;
