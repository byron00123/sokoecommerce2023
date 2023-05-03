import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ProductList from "./components/ProductList";
import { useState, useEffect } from "react";
import CartList from "./components/CartList";
import UpdateProduct from "./components/UpdateProduct";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState("all");

  const addProduct = (newproduct) => {
    setProduct([...product, newproduct])
  }

  const addToCart = (data) => {
    setCart([...cart, { ...data, quantity: 1 }]);
  };

  useEffect(() => {
    fetch("http://localhost:8000/electronics")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  const handleShow = (value) => {
    setShowCart(value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const filteredProducts = category === "all" ? product : product.filter(p => p.category === category);

  return (
    <div className="container-fluid">
      <Header count={cart.length} handleShow={handleShow} onCategoryChange={handleCategoryChange}/>
      <Main>
        <Routes>
          <Route path="/" element={<ProductList product={filteredProducts} addToCart={addToCart} addProduct={addProduct}/>}/>
        </Routes>
      </Main>
      <UpdateProduct/>
      {showCart ? (
        <CartList cart={cart} />
      ) : (
        <ProductList product={filteredProducts} addToCart={addToCart} addProduct={addProduct}/>
      )}
    </div>
  );
}

export default App;
