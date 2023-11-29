// PaymentForm.js
import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PaymentForm = () => {
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the client secret for the fixed $10 amount
        axiosSecure.post('/create-payment-intent', { price: 10 })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error('Error fetching client secret:', error);
                // Handle the error, setClientSecret to null or display an error message
            });
    }, [axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // Confirm the payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error: ' + confirmError);
        } else {
            console.log('payment intent: ', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Save the payment into the database (adjust as per your server logic)
                const payment = {
                    email: user.email,
                    price: 10,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'success'
                };

                const res = await axiosSecure.post('/payments', payment);

                console.log('payment saved', res.data);

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thanks for the Payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                const response = await axiosSecure.patch(`/users/member/${user?.email}`);
                console.log(response);
            }
        }
    }

    return (
        <form className="mt-4 p-4 border rounded-md shadow-md" onSubmit={handleSubmit}>
            <label className="block mb-8 uppercase font-medium">
                Card details: 
                <CardElement className="py-3 border my-10 rounded-md pl-12 pr-44 bg-gray-200 text-lg" />
            </label>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" disabled={!stripe}>
                Pay $10 and Become a Member
            </button>
        </form>
    );
};

export default PaymentForm;
