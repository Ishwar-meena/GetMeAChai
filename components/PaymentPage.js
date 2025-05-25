'use client';

import Script from "next/script"
import { initiate,fetchMessage } from "@/actions/serverActions"
import React, { useState,useEffect} from "react";



const UserMessage = React.memo(({name,amount,message})=> {
    return <div className="user-message mt-1.5 flex gap-1 items-center">
        <div className="img">
            <img src="avatar.gif" alt="user" className="h-8" />
        </div>
        <p className="text-sm">{name} donated <b>₹{amount/100}</b> with a message "{message}" </p>
    </div>
});

const PaymentPage = ({ username }) => {

    const [paymentForm, setPaymentForm] = useState({ name: '', amount: '', message: '' });
    const [messages, setMessages] = useState([]);

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
            callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`, // Your success URL
            prefill: {
                name: paymentForm.name,
                email: 'gaurav.kumar@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
        };
        const rzp =  new Razorpay(options);
        rzp.open();
    }

    useEffect(() => {
        const getMessages = async () => {
            const data = await fetchMessage(username);
            setMessages(data);
            console.log(messages);
            console.log("this is data");
            console.log(data);
        }
        getMessages();
    }, [])
    

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <div className="page">
                    <div className="banner-img relative">
                        <div>
                            <img src="profile background.webp" alt="profile banner" className="h-[22rem] w-full object-center  object-cover" />
                        </div>
                        <div className="absolute -bottom-12 left-[46%]">
                            <img src="profile.jpg" alt="profile" className="h-20 rounded-md border border-slate-400 relative" />
                        </div>
                    </div>
                    <div className="user-info text-center mt-12">
                        <p className="font-medium text-lg pt-1">@{username}</p>
                        <p className="text-slate-300">A nature lover developer dedecated for nature and forests</p>
                        <p className="text-slate-300">9,719 members. 82 posts. $15,450/release</p>
                    </div>
                    <div className="payment-message mt-3 flex gap-4 justify-center items-center">
                        <div className="bg-gray-800 w-2/5 p-5 rounded-md min-h-72">
                            <h2 className="text-lg font-medium">Supporters</h2>
                            {messages.map((message,idx)=>{
                               return <UserMessage
                                    key={idx}
                                    name={message.name}
                                    amount={message.amount}
                                    message={message.message}
                                />
                            })}
                            
                        </div>
                        <div className="bg-gray-800 w-2/5 p-5 rounded-md min-h-72">
                            <h2 className="font-medium text-lg">Make a Payment</h2>
                            <div className="mt-1">
                                <input type="text" onChange={handleChange} value={paymentForm.name} name="name" placeholder="Enter Your Name" className="bg-slate-700 w-sm p-1 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                                <input type="text" onChange={handleChange} value={paymentForm.amount} name="amount" placeholder="Enter Amount" className="bg-slate-700 w-sm p-1 my-1.5 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                                <input type="text" onChange={handleChange} value={paymentForm.message} name="message" placeholder="Enter Your Message" className="bg-slate-700 w-sm p-1 rounded-sm px-3 outline-none focus:border-1 focus:border-slate-500" />
                            </div>
                            <div className="btn">
                                <button className="bg-purple-800 cursor-pointer w-sm mt-2 py-1 rounded-md text-lg font-medium" onClick={()=>pay(paymentForm.amount * 100)}>Pay</button>
                            </div>
                            <div className="pay-btn mt-4">
                                <button className="bg-slate-700 cursor-pointer py-1 px-3 rounded-sm font-medium text-sm" onClick={()=>pay(10*100)}>Pay $10</button>
                                <button className="bg-slate-700 cursor-pointer py-1 px-3 rounded-sm font-medium text-sm mx-4" onClick={()=>pay(20*100)}>Pay $20</button>
                                <button className="bg-slate-700 cursor-pointer py-1 px-3 rounded-sm font-medium text-sm" onClick={()=>pay(30*100)}>Pay $30</button>
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
