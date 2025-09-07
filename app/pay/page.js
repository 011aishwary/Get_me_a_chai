"use client"
import React from 'react';

import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
// // import converttosubcurrency from '@/lib/convertosubcurrency';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!');

export default  function Pay({ searchParams }) {
  // const { canceled } = searchParams

  // if (canceled) {
  //   console.log(
  //     'Order canceled -- continue to shop around and checkout when you’re ready.'
  //   )
  // }
  const [amount, setAmount] = useState(0)
  // const { canceled } = await searchParams
  const paybody = {
    amount: amount,
    currency: 'inr',
    // quantity: 1,
  }

  const makePayement = async (e) => {
    e.preventDefault(); // Prevent form from submitting as GET
    const stripe = await loadStripe("pk_test_51S47ofF8qhcxPk5FVJgXaNuxmwlmqkyHh6Uf2l3Fiudr7dJa5p8YnBQgKU0cbkwdm5pvZ2mCIgs8AQTvqIRD6S7v00xAqUX0Kq");
    const body = {
      product : paybody
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({body}),
    })
    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id, });
    if (result.error) {
      console.log(result.error.message);
    }
  }

  // if (canceled) {
  //   console.log(
  //     'Order canceled -- continue to shop around and checkout when you’re ready.'
  //   )
  // }
  return (
    <form action="/api/checkout_sessions" method="POST" >
      <section className='bg-amber-400 flex flex-col justify-center items-center p-20 m-20 rounded-lg gap-8'>
        <input className='bg-amber-50 text-black px-5' type="number" name="amount" id="amount" onChange={(e) => setAmount(e.target.value)} />
        <button className='bg-amber-500 text-white p-2 rounded-lg' type="submit" role="link" >
          Checkout
        </button>
      </section>
    </form>
  )
}