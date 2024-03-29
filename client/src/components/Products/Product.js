import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import logo from './images/dough-boi-bakery-logo-dark.png'
import img1 from './images/facebook.png'
import img2 from './images/instagram.png'
import img4 from './images/pinterest.png'
import { BsCart2 } from "react-icons/bs";
import './Product.css';
import axios from 'axios';


export default function Product(){
    const [product, setFormData] = useState(null);
    const [filterMood,setfilterMood] = useState(false);
    const [filterName,setfilterName] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [addedStatus, setAddedStatus] = useState({});
    const [quantityMap, setQuantityMap] = useState({});

    const savedCartItems = localStorage.getItem('cartItems');
    axios.defaults.withCredentials = true;

    //localStorage.clear();

    
    useEffect(() => {
         //console.log(cart); 
          /*const fetchProduct = async () => {
            const response = await fetch(`https://dough-bakery.vercel.app/products`,{ 
            method:"GET",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }});
            const data = await response.json();
            console.log(data);
            setFormData(data);
          };*/
          /*fetch('/Products',{
            method:"GET",
          }) // replace with your server-side route
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.log(error));
        }, []);*/

          const fetchProduct = async () => {
            try {
              const response = await fetch(`https://dough-bakery-backend.vercel.app/products`, {
                headers: {
                    'Content-Type': 'application/json', 
                  }
              });
              const data = await response.json();
              console.log(data);
              setFormData(data);
            } catch (error) {
              console.error(error);
            }
          };
          
        fetchProduct();
    }, []);
      useEffect(() => {
        // Load cart items from localStorage when the component mounts
        if (savedCartItems) {
          setCartItems(JSON.parse(savedCartItems));
        }
      }, [])
      
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
        });
      }, [cartItems]); // Run the effect whenever cartItems changes
    
    

      const handleIncrement = (productId) => {
        setQuantityMap(prevMap => ({
          ...prevMap,
          [productId]: (prevMap[productId] || 1) + 1
        }));
      };

      const handleDecrement = (productId) => {
        setQuantityMap(prevMap => ({
          ...prevMap,
          [productId]: Math.max((prevMap[productId] || 1) - 1, 1)
        }));
      };

      /*const renderCartItems = () => {
        return cartItems.map((item, index) => (
          <li key={index}>
            Product: {item.name}, Quantity: {item.quantity}, Price: {item.price}
          </li>
        ));
      };
      */
      const handleAddToCart = (value,price) => {

        const itemExists = cartItems.some(cartItem => cartItem._id === value._id);

        if (!itemExists) {
        //setCount(count+1);
        const productId = value._id;

        if(!quantityMap[productId]){
            value['quantity'] = 1;
        }else{
            value['quantity'] = quantityMap[productId];
        }
        //console.log(quantityMap[productId]);
        value['cartPrice'] = price*value['quantity'];
        
        setCartItems([...cartItems, value]);
        setAddedStatus(prevStatus => ({
            ...prevStatus,
            [value._id]: true
          }));
        }
        };

        const handleFilter = (value) => {
            setfilterMood(true);
            setfilterName(value);
        };

        
        return (
        <div>
             <div className="navbar">
                <div className="navbar-logo" href="#"><Link to="/"><img src={logo} alt="logo"/></Link></div>
                <ul className="navbar-menu">
                    <li><Link to="/Products">Menu</Link></li>
                    <li><Link to="/Products">Contract</Link></li>
                    <li><Link to="/Products">About Us</Link></li>
                </ul>
                <ul className="navbar-social">
                    <div className="social-link"><a href="https://www.facebook.com/"><img src={img1} alt="facebook"/></a></div>
                    <div className="social-link"><a href="https://www.instagram.com/"><img src={img2} alt="Instagram"/></a></div>
                    <div className="social-link"><a href="https://www.pinterest.com/"><img src={img4} alt="Social Icon 3"/></a></div>
                    <div className='social-link'><Link to="/cart"style={{textDecoration: 'none',color:'black',paddingLeft:'0px'}}><BsCart2/>{cartItems.length}</Link></div>
                </ul>
            </div> 
            <div className="containerr">
                <div className="catagories">
                <h3>Catagories</h3>
                    <div className="box">
                      
                        <div className="form-check-radio">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => handleFilter('Cake')}></input>
                                       <label class="form-check-label" for="flexRadioDefault1">Cake</label> 
                                       <br></br>
                                       <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => handleFilter('Pastry')}></input>
                                       <label class="form-check-label" for="flexRadioDefault2">Pastry</label> 
                                       <br></br>
                                       <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => handleFilter('Muffin')}></input>
                                       <label class="form-check-label" for="flexRadioDefault3">Muffin</label>
                                       <br></br>
                                       <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => handleFilter('Brownies')}></input>
                                       <label class="form-check-label" for="flexRadioDefault4">Brownie</label> 
                                       <br></br>
                                       <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" onClick={() => handleFilter('Cookie')}></input>
                                       <label class="form-check-label" for="flexRadioDefault5">Cookie</label> 
                                       <br></br>
                                       <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" onClick={() => handleFilter('Donut')}></input>
                                       <label class="form-check-label" for="flexRadioDefault6">Donut</label> 
                        </div>
                    </div>
                </div>
                {filterMood ?
                <div className="product-box">
                   
                   {product && product.map((item, index) =>{

                    if(item.category===filterName)
                    {
                        const base64Data = btoa(String.fromCharCode(...new Uint8Array(item.imageSrc.data.data)));
                        return(
                            <div className="cardd" key={index}>
                            <div className='image-box'>
                                <img src={`data:${item.imageSrc.contentType};base64,${base64Data}`} alt="lala" />
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="card-title">
                                            <Link to={`/productsdetail/${item._id}`} style={{textDecoration: 'none',color:'black'}}>{item.name}</Link> 
                                            <p>{item.price} Tk</p>
                                        </div>
                                    </div>
                                    <div className='details'>
                                        <p className='text'>{item.details}</p>
                                    </div>
                                    <div className="btn-group">
                                        <div className="btn">
                                            <Link onClick={() => handleAddToCart(item)} style={{textDecoration: 'none',color:'white',paddingLeft:'15px'}}>Add to Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                   })}
                </div>
                :
                <div className="product-box">
                {product && product.map((item, index) => {
                    const base64Data = btoa(String.fromCharCode(...new Uint8Array(item.imageSrc.data.data))
                    );
                    return(
                    <div className="cardd" key={index}>
                    <div className='image-box'>
                        <img src={`data:${item.imageSrc.contentType};base64,${base64Data}`} alt="lala" />
                    </div>
                    <div className="quantityy-controls">
                            <button onClick={() => handleDecrement(item._id)} className="quantity-btn minus">-</button>
                                <span className="quantityy">{quantityMap[item._id] || 1}</span>
                            <button onClick={() => handleIncrement(item._id)} className="quantity-btn plus">+</button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="card-title">
                                    <Link to={`/productsdetail/${item._id}`} style={{textDecoration: 'none',color:'black'}}>{item.name}</Link> 
                                    {quantityMap[item._id] ?
                                    <p>{quantityMap[item._id] *item.price} Tk</p>
                                    :
                                    <p>{item.price} Tk</p>
                                    }
                                </div>
                            </div>
                            <div className='details'>
                                <p className='text'>{item.details}</p>
                            </div>
                            <div className="btn-group">
                                <div className="btn">
                                    <Link onClick={() => handleAddToCart(item,item.price)} disabled={addedStatus[item._id]} style={{textDecoration: 'none',color:'white',paddingLeft:'15px'}}>
                                        {addedStatus[item._id] ? 'Cart Added' : 'Add to Cart'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                }
            </div>
        </div>
    )
}