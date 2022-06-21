import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {
  BrowserRouter,
  useParams,
  Route,
  Routes
} from "react-router-dom";
import { useEffect } from 'react';
import Stripe from './stripe';


function App(props) {
  const windowUrl = window.location.search;
const params = new URLSearchParams(windowUrl);
  if(params.get('acc_id')){
    const stripePromise = loadStripe('pk_test_Vl7NdHPf2yLEUDou4TTJTG0N00F35InABj',{
      stripeAccount:params.get('acc_id')
      });
  }
  
  
useEffect(() => {
}, [])



  return (<BrowserRouter>
    <Routes>
    <Route path="/" element={<div>Hi....</div>} />
        <Route path="home" element={<Stripe/>} />
        <Route path="done" element={<div>Completed!...</div>} />
      
    </Routes>
  </BrowserRouter> 
  );
};
export default App;
