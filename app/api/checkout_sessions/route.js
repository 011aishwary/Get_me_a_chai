import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(request) {
    const formData = await request.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    // console.log(data);
    // const data = await request.json()
    // console.log(data)
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['amazon_pay', 'card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Custom Payment',
                        },
                        unit_amount: data.amount * 100, // Convert to paise
                    },
                    quantity: 1,
                },
                // {
                //     // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                //     price: amount,
                //     quantity: 1,

                // },
            ],
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}