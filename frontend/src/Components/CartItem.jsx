import { CurrencyFormatter } from "../util/CurrencyFormatter.js";

export default function CartItem({ name, quantity, price, onDecrease, onIncrease}) {


    return (
        <li className="cart-item">
        <p >
            {name} - {quantity} x {CurrencyFormatter.format(price)}
        </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
       </li>
    );
}