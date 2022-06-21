import React, { useEffect, useState, } from 'react';
import {PaymentElement, useStripe,PaymentRequestButtonElement, useElements} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  useParams,
  useNavigate
} from "react-router-dom";
const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();

  const [paymentRequest, setPaymentRequest] = useState(null);
  useEffect(() => {
    commonFunction()
  }, [stripe]);
  const commonFunction =async()=>{
    if (stripe) {
      const pr = await stripe.paymentRequest({
        country: 'CA',
        currency: 'cad',
        
        total: {
          label: 'Demo total',
          amount: props?.price,
        
        },
        requestPayerName: true,
        requestPayerEmail: true,
        
      });
console.log('prpr',pr);
      // Check the availability of the Payment Request API.
    await  pr.canMakePayment().then(result => {
        console.log('result',result);
        if (result) {
          setPaymentRequest(pr);
        }
      }).catch((err)=>{
        console.log('errroe',err);
      });
    }
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://143.110.250.139:3000/done?type=close',
      },
    });
console.log('error',error);

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      // setErrorMessage(error.message);
    } else {
      navigate('/done?type=close')
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  console.log('paymentRequest',paymentRequest);
  return (<div>
    <form onSubmit={handleSubmit}>
      <PaymentElement  />
      
      <button className='payBUtton' disabled={!stripe}>$CAD {props?.price} Pay</button>
    </form>
    {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}</div>
  );
};

export default CheckoutForm;