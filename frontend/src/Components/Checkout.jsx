import { useContext, useState } from "react";
import { CurrencyFormatter } from "../util/CurrencyFormatter.js";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Error from "./Error/Error.jsx"; // Assuming you have an Error component for displaying error messages

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    setError(null); // Reset error before a new submission

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch("https://the-food-spot-backend.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      // If successful, update the success state
      setSuccess(true);
      setLoading(false); // Turn off loading
    } catch (err) {
      setError(err.message);
      setLoading(false); // Turn off loading
    }
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCart}>
        Close
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Order"}
      </Button>
    </>
  );

  if (success) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your Order was Submitted Successfully.</p>
        <p>
          We will get back to you with more details via email within the next few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleCloseCart}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {CurrencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" required />
        <Input label="E-Mail" type="email" id="email" required />
        <Input label="Street" type="text" id="street" required />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" required />
          <Input label="City" type="text" id="city" required />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
