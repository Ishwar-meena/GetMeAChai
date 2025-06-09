'use client';

import Script from "next/script"
import { initiate, fetchMessage, fetchPaymentDetails, fetchProfilePic } from "@/actions/serverActions"
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserMessage = React.memo(function UserMessage({ name, amount, message }){
    return <div className="user-message mt-1.5 flex gap-1 items-center">
        <div>
            <Image
                unoptimized
                height={32}
                width={32}
                src="/avatar.gif"
                alt="user"
                className="h-8"
            />
        </div>
        <p className="text-sm">{name} donated <b>₹{amount / 100}</b> with a message &quot;{message}&quot; </p>
    </div>
});

const PaymentPage = ({ username, success }) => {

    const [paymentForm, setPaymentForm] = useState({ name: '', amount: '', message: '' });
    const [messages, setMessages] = useState([]);
    const [payment, setPayment] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    }

    const pay = async (amount) => {
        const order = await initiate(amount, username, paymentForm);

        const options = {
            key: process.env.NEXT_PUBLIC_KEY_ID, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Get Me A Chai',
            description: paymentForm.message,
            order_id: order.id, // This is the order_id created in the backend
            callback_url: '/api/razorpay', // Your success URL
            prefill: {
                name: paymentForm.name,
                email: 'gaurav.kumar@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
        };
        const rzp = new Razorpay(options);
        rzp.open();
    }

    useEffect(() => {
        const getMessages = async () => {
            const data = await fetchMessage(username);
            setMessages(data);
        }
        getMessages();
    }, [username])

    useEffect(() => {
        setLoading(false);
        if (success === 'true') {
            toast.success('Payment successfully done!');
            router.replace(`/${username}`);
        }
        const paymentData = async () => {
            const newPayment = await fetchPaymentDetails(username);
            const pic = await fetchProfilePic(username);
            setProfile(pic);
            setPayment(newPayment);
            
        }
        paymentData();
        setLoading(true);        
    }, [success,router, username]);

    if (!loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <div className="page">
                    <div className="banner-img relative">
                        <div>
                            <Image
                                priority
                                height={352}
                                width={1440}
                                src="/profile background.webp"
                                alt="profile banner"
                                className="h-[22rem] w-full object-center  object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-12 left-[46%] ">
                            <Image
                                height={80}
                                width={80}
                                src={profile ? profile : "/profile.png"}
                                alt="profile"
                                className="h-20 rounded-full border border-slate-400 relative"
                            />
                        </div>
                    </div>
                    <div className="user-info text-center mt-12 mb-14">
                        <p className="font-medium text-lg pt-1 lg:pr-3 pl-5">@{username}</p>
                        <p className="text-slate-300 my-0.5">A nature lover developer dedecated for nature and forests</p>
                        <p className="text-slate-300">{payment ? payment.totalAmountCount : "0"} payments • ₹ {payment ? payment.totalAmount / 100 : "0"} raised</p>
                    </div>
                    <div className="payment-message mt-3 my-2 flex lg:flex-row flex-col gap-4 justify-center items-center">
                        <div className="bg-gray-800 lg:w-2/5 sm:w-3/4 w-[97%] sm:px-5 px-2 py-5  rounded-md ">
                            <h2 className="text-lg font-medium">Supporters</h2>
                            <div className="max-h-56 min-h-56  overflow-auto">
                                {messages.length == 0 && <div>There is not payment messages.</div>}
                                {messages.map((message, idx) => {
                                    return <UserMessage
                                        key={idx}
                                        name={message.name}
                                        amount={message.amount}
                                        message={message.message}
                                    />
                                })}
                            </div>
                        </div>
                        <div className="bg-gray-800 lg:w-2/5 sm:w-3/4 w-[97%] sm:px-5 px-2 py-5  rounded-md min-h-72">
                            <h2 className="font-medium text-lg">Make a Payment</h2>
                            <div className="mt-1">
                                <input type="text" onChange={handleChange} value={paymentForm.name} name="name" placeholder="Enter Your Name" className="bg-slate-700 sm:w-sm w-[20rem] p-1 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                                <input type="text" onChange={handleChange} value={paymentForm.amount} name="amount" placeholder="Enter Amount" className="bg-slate-700 sm:w-sm w-[20rem] p-1 my-1.5 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                                <input type="text" onChange={handleChange} value={paymentForm.message} name="message" placeholder="Enter Your Message" className="bg-slate-700 sm:w-sm w-[20rem] p-1 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                            </div>
                            <div className="btn">
                                <button className="bg-purple-800 cursor-pointer sm:w-sm w-[20rem] mt-2 py-1 rounded-md text-lg font-medium" onClick={() => pay(paymentForm.amount * 100)}>Pay</button>
                            </div>
                            <div className="pay-btn mt-4">
                                <button disabled={paymentForm.name.length < 3 || paymentForm.amount.length < 1 || paymentForm.message < 3} className={`disabled:bg-slate-400 disabled:cursor-not-allowed bg-slate-700 cursor-pointer  py-1 px-3 rounded-sm font-medium text-sm`} onClick={() => pay(10 * 100)}>Pay $10</button>
                                <button disabled={paymentForm.name.length < 3 || paymentForm.amount.length < 1 || paymentForm.message < 3} className={`disabled:bg-slate-400 disabled:cursor-not-allowed bg-slate-700 cursor-pointer  py-1 px-3 rounded-sm font-medium text-sm mx-4`} onClick={() => pay(20 * 100)}>Pay $20</button>
                                <button disabled={paymentForm.name.length < 3 || paymentForm.amount.length < 1 || paymentForm.message < 3} className={`disabled:bg-slate-400 disabled:cursor-not-allowed bg-slate-700 cursor-pointer  py-1 px-3 rounded-sm font-medium text-sm`} onClick={() => pay(30 * 100)}>Pay $30</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">.</div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
