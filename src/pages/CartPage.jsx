import React, { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: total.toString() } }],
          }),
          onApprove: (data, actions) =>
            actions.order.capture().then((details) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              clearCart();
            }),
        }).render("#paypal-button-container");
      }
    });
    document.body.appendChild(script);
  }, [total]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div>
          {/* <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <span className="font-semibold">{item.name}</span> - ${item.price}
              </li>
            ))}
          </ul> */}
          <ul className="mb-4 divide-y border rounded-md p-4 bg-gray-50">
  {cart.map((item, index) => (
    <li key={index} className="py-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-700">${item.price}</span>
      </div>
    </li>
  ))}
</ul>

          <p className="text-xl font-semibold">Total: ${total}</p>
          <div id="paypal-button-container" className="mt-4"></div>
          <Button className="mt-4" variant="outline" onClick={clearCart}>Clear Cart</Button>
        </div>
      )}
    </div>
  );
}
