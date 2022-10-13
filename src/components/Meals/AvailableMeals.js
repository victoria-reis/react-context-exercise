import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://food-ordering-app-4406c-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchData().catch((error) => {
			setIsLoading(false);
			setError(error.message);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<p className={classes.mealsLoading}>Loading...</p>
			) : error ? (
				<p className={classes.mealsLoading}>{error}</p>
			) : (
				<section className={classes.meals}>
					<Card>
						<ul>
							{meals.map((meal) => {
								return (
									<MealItem
										key={meal.id}
										id={meal.id}
										name={meal.name}
										description={meal.description}
										price={meal.price}
									/>
								);
							})}
						</ul>
					</Card>
				</section>
			)}
		</>
	);
};

export default AvailableMeals;
