import React, { useState } from 'react';

function ProductList({ product, addToCart }) {
  let [products, setProduct] = useState(product);
  
  function handleDelete(id) {
    fetch(`http://localhost:8000/electronics/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      setProduct(products.filter(product => product.id !== id));
    })
    .catch(error => console.log(error));
  }

  return (
    <div className='flex'>
      {products.map((productItem, productIndex) => {
        return (
          <div style={{ width: '50%' }}>
            <div className='product-item'>
              <img src={productItem.img} width='100%' alt='product' />
              <p>
                {productItem.productname} | Kshs {productItem.price}
              </p>
              <p>
                {productItem.category} | {productItem.quantity}
              </p>
              <button onClick={() => addToCart(productItem)}>Add To Cart</button>
              <button onClick={() => handleDelete(productItem.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
