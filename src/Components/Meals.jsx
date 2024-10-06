import { useState, useEffect } from "react";
import MealsItem from "./MealsItem.jsx";
import Error from "./Error/Error.jsx";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/meals");

        if (!response.ok) {
          throw new Error(`Failed to fetch meals. Status: ${response.status}`);
        }

        const meals = await response.json();
        if (isMounted) {
          setLoadedMeals(meals);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMeals();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <p className="Error">Loading Meals...</p>
    );
  }

  if (error) {
    return <Error title="Failed to Fetch Meals" msg={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.length > 0 ? (
        loadedMeals.map((meal) => <MealsItem key={meal.id} meal={meal} />)
      ) : (
        <Error title="Failed to Fetch Meals." msg={error} />
      )}
    </ul>
  );
}
