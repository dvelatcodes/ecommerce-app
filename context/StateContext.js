import React, { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  // function for increase quantity button on slug.js
  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  // function for decrease quantity button on slug.js
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };
  //function to add one or more selected product to cart and to check if a product is already existing in cart so as to increase only the product's quantity
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + quantity * product.price
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };
  // function to remove product from cart
  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItem = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - product.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItem);
  };
  // unassigned values to contain product to be reduced/increased on the cart page
  let index;
  let foundProduct;
  // function to reduce or increase the quantity of product on the cart page
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    const newCart = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      setCartItems([
        ...newCart,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCart,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};
// Not only seeing the digital space as the future and way forward and besides all the fancy benefits as a software engineer. I see the digital space as a platform where we can connect a seller(who is rendering any service whatsoever) to a buyer(ready to purchase that service). Being able to create that platform as a software engineer is a dream come true because it is really fun and nice due to the fact that, everything in the world is a means of exchange, be it the exchange of conversation, money for goods, and services, import of foreign natural resource for export of locally produced resource. Being able to connect both parties together via the virtual space where location is not a barrier and enable a complete transaction process is a quest I hunger to see become a reality. There is a popular saying that "You only value the product or service you pay for with your personal resource". My rephrased proverb is "When you know the difficulty in acquiring personal resources be it a dollar or more, you value when it is given to you on a platter of gold. From my kindergarten level due to side talk inducement, I believed I did not have what it takes to succeed, I constantly failed. I am grateful for so many things in life because my dear mother never gave up on me, she kept on believing, encouraging, and investing in me even though no significant result was showing forth, she never gave up hope. The tides completely changed in my favor when I got fed up with failing. My belief system changed, I learnt I could achieve anything I desired by putting my mind to it. My various experiences of failing gave me the resilience I needed to never accept failure as an answer. My little but fulfilled success story would never have been possible if my mother did not believe in me, and was optimistic about ensuring I finished strong by sponsoring my secondary and undergraduate studies single-handedly. A little belief was all it took to transform a nobody into a great man.  I beacon on ALX and Partners to believe in a boy that does not take failure as an answer but only sees solutions as the outcome. I sincerely and hungrily desire full sponsorship through this unprecedented and amazing program. Thank you so much for your warm consideration.

export const useStateContext = () => useContext(Context);
