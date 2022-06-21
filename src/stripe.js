import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import { useEffect } from 'react';


function App(props) {
  const windowUrl = window.location.search;
const params = new URLSearchParams(windowUrl);
  let { key,price,acc_id } = useParams();
  if(params.get('acc_id')){
  const stripePromise = loadStripe('pk_test_Vl7NdHPf2yLEUDou4TTJTG0N00F35InABj',{
  stripeAccount:params.get('acc_id')
  });
}
useEffect(() => {
 console.log('key,price,acc_id key,price,acc_id ',key,price,acc_id,props,params.get('key') );
}, [])

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: params.get('key'),
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (<div className="ff">
   {params.get('key') ? <Elements   stripe={loadStripe('pk_test_Vl7NdHPf2yLEUDou4TTJTG0N00F35InABj',{
  stripeAccount:params.get('acc_id')
  })} options={options}>
      <CheckoutForm price={params.get('price')}/>
      
    </Elements>:"Ready TO prepare"}</div>
  );
};
export default App;
