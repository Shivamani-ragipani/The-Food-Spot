import { CurrencyFormatter } from "../util/CurrencyFormatter.js";

export default function CarItem({ name, quantity, price}) {
    return (
        <p className="cart-item">
            {name} - {quantity} x {CurrencyFormatter.format(price)}
            <p className="cart-item-actions">
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </p>
        </p>
    );
}