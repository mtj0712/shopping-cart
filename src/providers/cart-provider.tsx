import { useReducer } from "react";
import type { ReactNode } from "react";
import { cartReducer } from "@/reducers/cart-reducer";
import { CartContext } from "@/context/cart-context";
import type { Product } from "@/api/types";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Product) => {
    dispatch({ type: "added", product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "removed", productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "quantity_updated", productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "cleared" });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext>
  );
}
