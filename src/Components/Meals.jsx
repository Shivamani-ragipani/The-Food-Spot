import { useState, useEffect } from "react";
import MealsItem from "./MealsItem.jsx";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    async function fetchMeals() {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch('http://localhost:5000/meals');

        if (!response.ok) {
          throw new Error(`Failed to fetch meals. Status: ${response.status}`);
        }

        const meals = await response.json();
        if (isMounted) { // Only update state if component is still mounted
          setLoadedMeals(meals);
        }
      } catch (err) {
        console.error(err); // Log the error object
        if (isMounted) { // Only update state if component is still mounted
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false); // Set loading to false regardless of success or error
        }
      }
    }

    fetchMeals();

    return () => {
      isMounted = false; // Cleanup function to avoid state updates on unmounted component
    };
  }, []);

  if (isLoading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.length > 0 ? (
        loadedMeals.map((meal) => (
          <MealsItem key={meal.id} meal={meal} />
        ))
      ) : (
        <p>No meals available.</p>
      )}
    </ul>
  );
}
