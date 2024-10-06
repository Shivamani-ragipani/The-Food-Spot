import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

import { useContext } from "react";
import { CurrencyFormatter } from "../util/CurrencyFormatter.js";

export default function MealsItem({meal}) {
    const cartadd = useContext(CartContext);

    function handleAddMealtoCart() {
        cartadd.addItem(meal);
    }

    
    return(
        <li className="meal-item">
            <article>
                <img src={`https://the-food-spot-backend.onrender.com/${meal.image}`} alt={meal.name}/>
                <h3>
                    {meal.name}
                </h3>
                <p className="meals-item-price">{CurrencyFormatter.format(meal.price)}</p>
                <p className="meals-item-description">{meal.description}</p>
            
                 <p className="meals-item-actions">
                <Button onClick={handleAddMealtoCart}>Add to Cart</Button>
                 </p>
            </article>
        </li>
    );
}