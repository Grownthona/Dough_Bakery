import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
//import Home from './components/Home/Home';
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SignIn';
import Product from './components/Products/Product';
//import ImageUploadForm from './ImageUploadForm';
import ProductDetails from './components/Products/ProductDetails';
//import ImageResize from './ImageResize';
import UploadForm from './UploadForm';
//import Test from './components/Test';
/*
import React,{useEffect,useState} from 'react'

function App(){
  const[backendData,setBackendData] = useState([{}]);

  useEffect(()=>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  },[])
  
  return(
    <div className='App'>
      {backendData.users.map((user,i)=>(
        <p key={i}>{user}</p>
       ))}
    </div>
  )
}
*/


function App() {
  return(
    <Router>
       <Routes>
        <Route exact path='/' element={<UploadForm/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/Products' element={<Product/>}></Route>
        <Route path='/productsdetail/:id' element={<ProductDetails/>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App;
