// src/pages/LogIn.jsx

import React, { useState } from 'react';

const LogIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Login form submitted", form);
    try {
      const response=await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(form),
        credentials: "include" 
      })
      const data=await response.json()
      if(response.ok){
        alert(data.message||"logged in succesfully")
      }else{
        alert(data.error|| "failed to log in")
      }
    } catch (error) {
      console.log("Error logging  form:", error);
      alert("Error logging form");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
