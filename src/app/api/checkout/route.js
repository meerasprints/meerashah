// src/app/api/checkout/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import resend from '@/lib/resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { cartItems } = body;

  const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const airtableURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Orders`;

  try {
    // 1. Save each item to Airtable
    const records = cartItems.map((item) => ({
      fields: {
        Email: item.email || '',
        Phone: item.phone || '',
        Address: item.address || '',
        PrintSide: item.side,
        Color: item.color,
        Quantity: item.quantity,
        PricePerUnit: item.pricePerUnit,
        Total: item.total,
      },
    }));

    const airtableRes = await fetch(airtableURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records }),
    });

    const airtableData = await airtableRes.json();
    if (!airtableRes.ok) {
      console.error('Airtable error:', airtableData);
      return NextResponse.json({ error: 'Airtable failed' }, { status: 500 });
    }

    // 2. Send confirmation email
    const email = cartItems[0].email;
    const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

    await resend.emails.send({
      from: "Meera's Prints <test@resend.dev>",
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h2>Thank you for your order!</h2>
        <p>We’ve received your order for ${cartItems.length} item(s).</p>
        <p><strong>Total:</strong> $${totalAmount.toFixed(2)}</p>
        <p><strong>Shipping Address:</strong> ${cartItems[0].address}</p>
      `,
    });

    // 3. Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `T-Shirt (${item.side}, ${item.color})`,
          },
          unit_amount: Math.round(item.pricePerUnit * 100),
        },
        quantity: item.quantity,
      })),
      success_url: 'https://meerasprints.com/success',
      cancel_url: 'https://meerasprints.com/cancel',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err.message, err.stack);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
