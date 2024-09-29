import { useContext } from "react";
import { CurrencyFormatter } from "../util/CurrencyFormatter.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealsItem({meals}) {
    const cartadd = useContext(CartContext);

    function handleAddMealtoCart() {
        cartadd.addItem(meals);
    }

    return(
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meals.image}`} alt={meals.name}/>
                <h3>
                    {meals.name}
                </h3>
                <p className="meals-item-price">{CurrencyFormatter.format(meals.price)}</p>
                <p className="meals-item-description">{meals.description}</p>
            
                 <p className="meals-item-actions">
                <Button OnClick={handleAddMealtoCart}>Add to Cart</Button>
                 </p>
            </article>
        </div>
    );
}