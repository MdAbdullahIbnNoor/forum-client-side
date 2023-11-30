import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import useMember from '../../hooks/useMember';
import useAuth from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Membership = () => {
    const queryClient = useQueryClient();
    const [data, isMemberLoading, refetch] = useMember(); // Corrected destructuring
    const { user } = useAuth();

    const handleRefetch = async () => {
        // Optionally, you can manually trigger a refetch using the queryClient
        await queryClient.prefetchQuery(['memberCheck', user?.email, 'isMember'], () => refetch());
    };

    return (
        <div className="container mx-auto pt-24 p-8 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-3xl font-semibold mb-4">Membership Page</h2>
            {isMemberLoading ? (
                <span className="loading loading-lg loading-spinner text-info mx-96"></span>
            ) : data.badge === 'Gold' ? ( // Access data.badge
                <p className="text-green-600 text-4xl text-center my-56 font-bold">You are already a member. Thank you for your support!</p>
            ) : (
                <Elements stripe={stripePromise}>
                    <PaymentForm onSuccess={handleRefetch} />
                </Elements>
            )}
        </div>
    );
};

export default Membership;
