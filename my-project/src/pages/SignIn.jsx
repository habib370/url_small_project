// src/pages/SignIn.jsx

import React, { useState } from 'react';

const SignIn = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit =async  (e) => {
    e.preventDefault();
    console.log("Sign In form submitted", form);
   try {
     const response=await fetch("http://localhost:5000/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form),
      credentials: "include" 
    })
    const data=await response.json()
    localStorage.setItem("token",data.token)
    if(response.ok){
       alert(data.message|| "Created succesfully")
    }
    else {
  alert(data.error || "Failed to create account");
}
   } catch (error) {
    console.log("Error signing form:", error);
      alert("Error signing form");
   }
  };
  

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Account</button>
      </form>
    </div>
  );
};

export default SignIn;
