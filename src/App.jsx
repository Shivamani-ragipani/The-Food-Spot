import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { useState } from "react";
import Cart from "./Components/Cart.jsx";
import UserProgressContext, { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header />
      <Meals setLoading={setLoading} setError={setError} /> 
      <Cart />
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
