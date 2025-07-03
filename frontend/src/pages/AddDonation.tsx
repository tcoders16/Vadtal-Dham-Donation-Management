import React, { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook

export default function AddDonation() {
  const navigate = useNavigate(); // ✅ Setup navigate hook

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  async function searchDonors(query: string) {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          `http://localhost:3000/app/admin/donor/search?name=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter the donor’s name.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const donationData = {
      name: name.trim(),
      email: username.trim(),
      phone: phone.trim(),
      address: address.trim(),
      donation: parseFloat(amount),
      message: message.trim(),
    };

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/app/admin/donor/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(donationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Donation added successfully.");
        setName("");
        setUsername("");
        setPhone("");
        setAddress("");
        setAmount("");
        setMessage("");
        setSuggestions([]);
      } else {
        const errorText = data?.message || "Unknown error occurred.";
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo src="/images/logo.png" size={100} />
        </div>

        <h1 className="text-2xl mb-6 text-center text-indigo-700 poppins-bold">
          Add Donor & Donation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Donor Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Donor Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                searchDonors(e.target.value);
              }}
              required
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />

            {suggestions.length > 0 && (
              <ul className="border border-gray-300 mt-2 rounded-lg bg-white shadow-md">
                {suggestions.map((donor) => (
                  <li
                    key={donor._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setName(donor.name);
                      setPhone(donor.phone || "");
                      setAddress(donor.address || "");
                      setUsername(donor.email || "");
                      setSuggestions([]);
                    }}
                  >
                    {donor.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Email
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 123 456 7890"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Temple Street, Toronto"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Donation Amount (CAD)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="100.00"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any message for the temple..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg poppins-medium transition duration-200 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Adding..." : "Add Donation"}
          </button>
        </form>



      </div>


      {/* 🔍 New Button for Search Page */}
      <div className="mt-6 w-full max-w-lg">
        <button
          onClick={() => navigate("/search-donations")}
          className={`w-full py-3 rounded-lg poppins-medium transition duration-200 ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          🔎  Search Donations
        </button>
      </div>


        
    </div>
  );
}