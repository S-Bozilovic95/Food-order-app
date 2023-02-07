import { useCallback, useEffect, useState } from "react";
import { getAllMeals } from "../../api/meals/meals";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMeals = useCallback(async () => {
    let response = await getAllMeals();

    try {
      let mealsArr = [];
      for (const key in response.data) {
        mealsArr.push({
          id: key,
          name: response.data[key].name,
          description: response.data[key].description,
          price: response.data[key].price,
        });
      }
      setMealsList(mealsArr);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>something went wrong</p>}

        {!isLoading && !isError && (
          <ul>
            {mealsList.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  key={meal.id}
                ></MealItem>
              );
            })}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
