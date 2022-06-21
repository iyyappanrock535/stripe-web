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
  let { key,price,acc_id } = useParams();
  const stripePromise = loadStripe('pk_test_Vl7NdHPf2yLEUDou4TTJTG0N00F35InABj',{
  stripeAccount:params.get('acc_id')
  });
  
useEffect(() => {
 console.log('key,price,acc_id key,price,acc_id ',key,price,acc_id,props,params.get('key') );
}, [])

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: params.get('key'),
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (<BrowserRouter>
    <Routes>
     
        <Route path="home" element={<Stripe/>} />
        <Route path="done" children={()=><div>Completed!...</div>} />
      
    </Routes>
  </BrowserRouter> 
  );
};
export default App;
