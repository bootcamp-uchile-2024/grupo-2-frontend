import { CervezaInterface } from "@/types";
import React, { createContext, useEffect, useState } from "react";

interface CartContextType {
  cart: CartType[];
  addItemToCart: (item: CervezaInterface) => void;
  deleteItemFromCart: (item: CervezaInterface) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

type CartType = CervezaInterface;

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartType[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const storedTotalAmount = localStorage.getItem("totalAmount");
    return storedTotalAmount ? JSON.parse(storedTotalAmount) : 0;
  });
  const [totalItems, setTotalItems] = useState<number>(() => {
    const storedTotalItems = localStorage.getItem("totalItems");
    return storedTotalItems ? JSON.parse(storedTotalItems) : 0;
  });

  // Save Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
  }, [cart, totalAmount, totalItems]);

  function addItemToCart(item: CervezaInterface) {
    const itemToFind = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemToFind === -1) {
      setCart([...cart, { ...item, stock: 1 }]);
      setTotalAmount((prevState) => prevState + Number(item.precio));
      setTotalItems((prevState) => prevState + 1);
      return;
    } else {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.stock && cartItem.stock + 1,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
      setTotalAmount((prevState) => prevState + Number(item.precio));
      setTotalItems((prevState) => prevState + 1);
    }
  }

  function deleteItemFromCart(item: CervezaInterface) {
    const filteredItems = [...cart].filter((items) => items.id !== item.id);
    setCart(filteredItems);
    setTotalAmount((prevState) => prevState - Number(item.precio));
    setTotalItems((prevState) => prevState - 1);
  }

  function clearCart() {
    setCart([]);
    setTotalAmount(0);
    setTotalItems(0);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
