import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {
  const cartctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const carttotal = cartctx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handlehideCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h3>Your Cart</h3>
      <ul>
        {cartctx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{CurrencyFormatter.format(carttotal)} </p>
      <p className="modal-actions">
        <Button textOnly onClick={handlehideCart}>Close</Button>
        <Button onClick={handlehideCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
