import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/create-contact`,
        formData
      );

      if (res.status === 201) {
        alert(res.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        navigate("/");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-800 w-full min-h-screen flex justify-center items-center py-6">
      <div className="w-[90%] sm:w-3/4 lg:w-1/2 rounded-xl bg-gray-600/10 p-6 flex flex-col items-center">
        <span className="text-2xl text-amber-50 font-bold mb-4">
          Create New Contact
        </span>

        <div className="w-full sm:w-2/3">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label className="text-white text-md mt-2">Enter Name</label>
              <input
                className={`w-full border-2 p-2 rounded-lg text-white bg-transparent ${
                  errors.name ? "border-red-400" : "border-white"
                }`}
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
              />
              <p className="min-h-5.5 text-sm mt-1">
                {errors.name && (
                  <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded-md inline-block">
                    {errors.name}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-white text-md mt-2">Enter Email</label>
              <input
                className={`w-full border-2 p-2 rounded-lg text-white bg-transparent ${
                  errors.email ? "border-red-400" : "border-white"
                }`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <p className="min-h-5.5 text-sm mt-1">
                {errors.email && (
                  <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded-md inline-block">
                    {errors.email}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-white text-md mt-2">
                Enter Phone Number
              </label>
              <input
                className={`w-full border-2 p-2 rounded-lg text-white bg-transparent ${
                  errors.phone ? "border-red-400" : "border-white"
                }`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="number"
              />
              <p className="min-h-5.5 text-sm mt-1">
                {errors.phone && (
                  <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded-md inline-block">
                    {errors.phone}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-white text-md mt-2">Enter Message</label>
              <input
                className="w-full border-2 border-white p-2 rounded-lg text-white bg-transparent"
                name="message"
                value={formData.message}
                onChange={handleChange}
                type="text"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-500 w-full sm:w-2/3 rounded-lg p-2 text-xl text-white mt-6 self-center hover:bg-gray-400 transition"
            >
              Create Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
