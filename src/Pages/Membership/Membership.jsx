import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const Membership = () => {
    const [isMember, setIsMember] = useState(false);

    const handlePaymentSuccess = () => {
        // Handle actions after successful payment
        setIsMember(true);
    };

    return (
        <div className="container mx-auto pt-24 p-8 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-3xl font-semibold mb-4">Membership Page</h2>
            {isMember ? (
                <p className="text-green-600">You are already a member. Thank you for your support!</p>
            ) : (
                <Elements stripe={stripePromise}>
                    <PaymentForm onSuccess={handlePaymentSuccess} />
                </Elements>
            )}
        </div>
    );
};

export default Membership;
