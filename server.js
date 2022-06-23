const express = require('express')
const app = express()

const stripe = require('stripe')('sk_test_51GpJBKCh0aVQteBpiOG8LrCraKlZY3V0wudKcm56JTHgoUUpBE93b1zB4QrPMXLEvg0Wb1MAZc54WSW9cPY4MRUW00ZjTvsYby');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/payment-sheet', async (req, res) => {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'CAD',
    // customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
    // payment_method_types:["afterpay_clearpay"]
    // payment_method_types: [
    // "acss_debit", "afterpay_clearpay", "alipay", "card", "card_present",
    // "fpx", "giropay", "grabpay", "ideal", "interac_present", "klarna", "konbini", "link", "oxxo",
    //  "p24", 'paynow', 
    // "sepa_debit", "sofort", "us_bank_account", "wechat_pay"],
    

    
  });
console.log('paymentIntentpaymentIntent',paymentIntent);
  res.json({
    paymentIntent: paymentIntent.client_secret,
    // ephemeralKey: ephemeralKey.secret,
    // customer: customer.id,
    publishableKey: 'pk_test_Vl7NdHPf2yLEUDou4TTJTG0N00F35InABj'
  });
});


app.listen(3000)