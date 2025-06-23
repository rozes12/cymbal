// import React, { useEffect } from "react";
// import { useCartStore } from "@/stores/cartStore";
// import { Button } from "@/components/ui/button";

// export default function CartPage() {
//   const cart = useCartStore((state) => state.cart);
//   const clearCart = useCartStore((state) => state.clearCart);
//   const total = cart.reduce((sum, item) => sum + item.price, 0);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
//     script.addEventListener("load", () => {
//       if (window.paypal) {
//         window.paypal.Buttons({
//           createOrder: (data, actions) => actions.order.create({
//             purchase_units: [{ amount: { value: total.toString() } }],
//           }),
//           onApprove: (data, actions) =>
//             actions.order.capture().then((details) => {
//               alert("Transaction completed by " + details.payer.name.given_name);
//               clearCart();
//             }),
//         }).render("#paypal-button-container");
//       }
//     });
//     document.body.appendChild(script);
//   }, [total]);

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is currently empty.</p>
//       ) : (
//         <div>
//           {/* <ul className="mb-4">
//             {cart.map((item, index) => (
//               <li key={index} className="mb-2 border-b pb-2">
//                 <span className="font-semibold">{item.name}</span> - ${item.price}
//               </li>
//             ))}
//           </ul> */}
//           <ul className="mb-4 divide-y border rounded-md p-4 bg-gray-50">
//   {cart.map((item, index) => (
//     <li key={index} className="py-2">
//       <div className="flex justify-between items-center">
//         <span className="font-medium">{item.name}</span>
//         <span className="text-gray-700">${item.price}</span>
//       </div>
//     </li>
//   ))}
// </ul>

//           <p className="text-xl font-semibold">Total: ${total}</p>
//           <div id="paypal-button-container" className="mt-4"></div>
//           <Button className="mt-4" variant="outline" onClick={clearCart}>Clear Cart</Button>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem); // Make sure this action exists in your cartStore
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // No more getImageUrl mock needed! We'll use item.imageUrl directly.

  useEffect(() => {
    // Only load PayPal script if there are items in the cart
    if (cart.length > 0 && window.paypal) {
      // Clear existing buttons to prevent re-rendering issues
      const paypalContainer = document.getElementById("paypal-button-container");
      if (paypalContainer) {
        paypalContainer.innerHTML = '';
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => actions.order.create({
          purchase_units: [{ amount: { value: total.toFixed(2) } }], // Ensure total is formatted for PayPal
        }),
        onApprove: (data, actions) =>
          actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name + "!");
            clearCart();
          }),
        onError: (err) => {
          console.error("PayPal Error:", err);
          alert("An error occurred with PayPal. Please try again.");
        }
      }).render("#paypal-button-container");
    } else if (cart.length === 0) {
      // If cart is empty, ensure no PayPal buttons are rendered
      const paypalContainer = document.getElementById("paypal-button-container");
      if (paypalContainer) {
        paypalContainer.innerHTML = '';
      }
    }

    // Load the PayPal SDK script only once, or handle dynamic loading if not already loaded.
    // This is a simplified approach; in a real app, you might check if the script is already loaded
    // or use a more sophisticated script loader.
    if (!document.getElementById("paypal-sdk-script")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk-script"; // Give it an ID to check if it exists
      script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD"; // Replace 'sb' with your actual client ID
      script.async = true; // Make it load asynchronously
      document.body.appendChild(script);
    }

  }, [total, cart.length, clearCart]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-theme(spacing.16)-theme(spacing.24))]">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-xl text-gray-600 mb-4">Your cart is currently empty. Time to find some awesome gear!</p>
          <Link to="/products">
            <Button className="px-6 py-3 text-lg">Shop Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Items in your cart</h3>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  {/* Item Image */}
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={item.imageUrl} // Directly use the imageUrl from your item object
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                  {/* Item Details */}
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.description || "A high-quality cymbal."}</p>
                    <p className="text-green-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:bg-red-100 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6">
                <Button
                    variant="outline"
                    onClick={clearCart}
                    className="px-6 py-3 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-colors"
                >
                    Clear Cart
                </Button>
            </div>
          </div>

          {/* Order Summary / Payment Section */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-xl p-6 h-fit sticky top-28">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h3>
            <div className="flex justify-between items-center text-lg font-medium text-gray-800 mb-4">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-medium text-gray-800 mb-6 border-t pt-4">
              <span>Total:</span>
              <span className="text-3xl font-extrabold text-green-700">${total.toFixed(2)}</span>
            </div>

            <div id="paypal-button-container" className="mt-6">
                {/* PayPal buttons will render here */}
            </div>
             <p className="text-sm text-gray-500 mt-4 text-center">
                Secure checkout powered by PayPal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}