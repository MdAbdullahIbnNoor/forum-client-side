// PaymentForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const { token, error } = await stripe.createToken(elements.getElement(CardElement));

        if (error) {
            setError(error.message);
        } else {
            // Send the token to your server for processing
            // For demo purposes, we'll just log it to the console
            console.log(token);

            // Call your server endpoint to handle the payment and update user membership status
            // For example: axios.post('/api/process-payment', { token })
            // Handle success in the callback
            onSuccess();
        }
    };

    return (
        <form className="mt-4 p-4 border rounded-md shadow-md" onSubmit={handleSubmit}>
            <label className="block mb-8 uppercase font-medium">
                Card details: 
                <CardElement className="py-3 border my-10 rounded-md pl-12 pr-44 bg-gray-200 text-lg" />
            </label>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" disabled={!stripe}>
                Pay 10$ and Become a Member
            </button>
        </form>
    );
};

export default PaymentForm;
