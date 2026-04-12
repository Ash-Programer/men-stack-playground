import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 w-100">
      <h2 className="text-blue-500 font-bold">User Register</h2>

      <input
        name="fullname"
        placeholder="Name"
        onChange={handleChange}
        className="border-none bg-yellow-50"
      />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit" className="bg-blue-400">
        Register
      </button>
    </form>
  );
};

export default UserRegister;
