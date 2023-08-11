import React, { useEffect,useState} from 'react';

//import { useParams } from 'react-router-dom';
import './Cart.css';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [addedStatus, setAddedStatus] = useState({});
  const [quantityMap, setQuantityMap] = useState({});

  const savedCartItems = localStorage.getItem('cartItems');

  useEffect(() => {
    // Load cart items from localStorage when the component mounts
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
 

  useEffect(() => {
    // Save cart items to localStorage whenever the cartItems state changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  }, [cartItems]);



  useEffect(() => {
    // Loop through cartItems and perform operations
    cartItems.forEach(item => {
        setQuantityMap(prevMap => ({
            ...prevMap,
            [item._id]: item.quantity
          }));

          setAddedStatus(prevStatus => ({
            ...prevStatus,
            [item._id]: true
          }));
          //setTotalPrice(total+item.price);
    });
  }, [cartItems]); // Run the effect whenever cartItems changes


  const handleIncrement = (productId,productPrice,Product) => {
    setQuantityMap(prevMap => ({
      ...prevMap,
      [productId]: (prevMap[productId] || 1) + 1
    }));
   
     Product['quantity'] = quantityMap[productId]+1;
  
    const pp = productPrice*(quantityMap[productId]+1);
    //Product.cartPrice = pp;
    //setCartItems([...cartItems, Product]);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, cartPrice: pp } : item
        )
      );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.cartPrice || 0), 0);
  };

  const handleDecrement = (productId,productPrice,Product) => {
    setQuantityMap(prevMap => ({
      ...prevMap,
      [productId]: Math.max((prevMap[productId] || 1) - 1, 1)
    }));

    if(Product['quantity']>1)
    {
      Product['quantity'] = quantityMap[productId]-1;

      const pp = productPrice*(quantityMap[productId]-1);
    //Product.cartPrice = pp;
    //setCartItems([...cartItems, Product]);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, cartPrice: pp } : item
        )
      );
    }
  
  };

  const removeCartItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(item => item !== itemToRemove);
    setCartItems(updatedCartItems);
  };

    //const [product, setProduct] = useState(null);
    //const { id } = useParams();

   /* useEffect(() => {
        const fetchProduct = async () => {
          const response = await fetch(`http://localhost:5000/products/cart`);
          const data = await response.json();
          console.log(data);
          setProduct(data);
        };
        fetchProduct();
      }, []);
      if (!product) {
        return <div>Loading...</div>;
      }
      */
  return (
    <div className='none'>
     
      <section className="h-100 h-custom">
        <div className='Cart'>
          <div className='cart-container'>
            <h1>Shopping Cart</h1>
          </div>
          <div className='cart-items'>
            <div className='cart-details'>
              <div className='card'>
                <div className='card-quantity'>
                  <h2>Cart</h2>
                  {cartItems && cartItems.map((item, index) => {
                    
                    const base64Data = btoa(String.fromCharCode(...new Uint8Array(item.imageSrc.data.data))
                    );
                    return(
                  <div className='cart-box' key={index}>
                  <div className='cart-boxx'>
                    <div className='cart-image'>
                    <img src={`data:${item.imageSrc.contentType};base64,${base64Data}`} alt="lala" />
                    </div>
                    <div className='item-details-box'>
                      <h3>{item.name}</h3>
                      <p>Catagory : {item.category}</p>
                      <p>Color : Blue</p>
                      <div className='cart-remove'>
                        <div className='remove'>
                          <p onClick={() => removeCartItem(item)}>Remove Cart</p>
                        </div>
                        <div className='remove'>
                          <p>Add to wishlist</p>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className='quantity'>
                      <div className="quantity-controlss">
                        <button onClick={() => handleDecrement(item._id,item.price,item)} className="quantity-btn minus">-</button>
                                <span className="quantityy">{quantityMap[item._id] || 1}</span>
                        <button onClick={() => handleIncrement(item._id,item.price,item)} className="quantity-btn plus">+</button>
                      </div>
                      <div className='price'>
                      
                        <h3>{item.cartPrice} Tk</h3>
                        
                      </div>
                    </div>
                  </div>
                  )})}
                </div>
              </div>
            </div>
            <div className='total-amount'>
              <h4>Total Amount</h4>
              <div className='amount-show'>
                <div>
                  <p>Temporary amount</p>
                </div>
                <div>
                  <p>{calculateTotalPrice()}</p>
                </div>
              </div>
              <div className='checkout-btn'><button className="button-15" role="button">Go to Checkout</button></div>
            </div>
          </div>
          
        </div>
      </section>
                   
    </div>
  );
}
