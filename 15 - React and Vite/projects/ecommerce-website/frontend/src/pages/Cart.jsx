import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart");

        if (response.ok) {
          const deserializedData = await response.json();
          setCartItems(deserializedData);
          setLoading(false);
        } else {
          console.log("API request failed:", response.status);
        }
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const deserializedData = await response.json();
        setCartItems(deserializedData.cart);
        setLoading(false);
        handleShowAlert(deserializedData.message, "warning");
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.log("Error removing product from cart:", error);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <h1>Welcome to the shopping cart!</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <Card key={item.id}>
              <Card.Body>
                <Card.Title>Name: {item.name}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p> Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
