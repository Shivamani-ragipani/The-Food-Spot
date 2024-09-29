import { useState, useEffect } from "react";
import MealsItem from "./MealsItem.jsx";

export default function Meals() {
  const [loadedMeals, setloadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

    //   if (!response.ok) {
    //     //
    //   }

      const meals = await response.json();
      setloadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
      <ul id="meals">
        {loadedMeals.map((meals) => 
          <MealsItem key={meals.id} meals={meals}/>
        )}
      </ul>
  );
}
