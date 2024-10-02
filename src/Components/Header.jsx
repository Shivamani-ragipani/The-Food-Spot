import { useContext } from "react";
import Button from "./UI/Button.jsx";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";


export default function Header() {
  const cartadd = useContext(CartContext);
  const userprogress = useContext(UserProgressContext);

  const totalCartItems = cartadd.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity; 
  }, 0);

  function handleShowCart() {
    userprogress.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} />
        <h1 >ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
