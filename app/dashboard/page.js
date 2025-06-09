'use client';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { fetchUserDetails, handleAction } from '@/actions/serverActions';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({ username: '', email: '', profilePic: '', razorpayId: '', razorpaySecret: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleAction(formData);
    if (response.success) {
      await update({ name: formData.username });
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  
  useEffect(() => {
    const getData = async (email) => {
      const data = await fetchUserDetails(email);
      setFormData(prev =>(
        {
          ...prev,
          username : data.username,
          email : data.email,
          profilePic : data.profilePic,
        }));
    }
    if (session && session.user?.email) {
      getData(session.user.email);
    }
    setLoading(true);
  }, [session])


  if(!loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">data is loading...</div>
      </div>
    );
  }

  if (!session) { 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Please login to access your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard mt-8">
      <h2 className="text-center sm:text-2xl text-xl font-medium">Welcome to your Dashboard</h2>
      <div className="flex flex-col items-center justify-center mt-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium my-1 text-slate-300">Username</label>
            <input type="text" onChange={handleChange} value={formData.username} name='username' className="bg-slate-600 sm:w-md w-[18rem] px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium my-1 text-slate-300">Email</label>
            <input disabled type="text" onChange={handleChange} value={formData.email} name='email' className="bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed sm:w-md w-[18rem] px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium my-1 text-slate-300">Profile Picture</label>
            <input type="text" onChange={handleChange} value={formData.profilePic} name='profilePic' className="bg-slate-600 sm:w-md w-[18rem] px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium my-1 text-slate-300">Razorpay Id</label>
            <input type="text" onChange={handleChange} value={formData.razorpayId} name='razorpayId' className="bg-slate-600 sm:w-md w-[18rem] px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium my-1 text-slate-300">Razorpay Secret</label>
            <input type="text" onChange={handleChange} value={formData.razorpaySecret} name='razorpaySecret' className="bg-slate-600 sm:w-md w-[18rem] px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
          </div>
          <div>
            <input type="submit" className="bg-blue-600 mt-4 sm:w-md w-[18rem] px-2 py-1.5 rounded-sm font-medium cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
