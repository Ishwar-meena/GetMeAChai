import React from 'react'

const Dashboard = () => {
  return (
    <div className="dashboard mt-8">
      <h2 className="text-center text-2xl font-medium">Welcome to your Dashboard</h2>
      <div className="flex flex-col items-center justify-center mt-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Name</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Email</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Username</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Profile Picture</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Razorpay Id</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium my-1 text-slate-300">Razorpay Secret</label>
          <input type="text" className="bg-slate-600 w-md px-2 py-1 rounded-sm focus:outline-1 focus:outline-slate-300" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
