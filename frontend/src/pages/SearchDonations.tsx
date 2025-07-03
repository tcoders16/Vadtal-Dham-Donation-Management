import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchDonations() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() &&
      !email.trim() &&
      !phone.trim() &&
      !amount.trim() &&
      !(fromDate && toDate)
    ) {
      alert("Please enter at least one filter to search.");
      return;
    }

    const params = new URLSearchParams();
    if (name.trim()) params.append("name", name.trim());
    else if (email.trim()) params.append("email", email.trim());
    else if (phone.trim()) params.append("phone", phone.trim());
    else if (amount.trim()) params.append("amount", amount.trim());
    else if (fromDate && toDate) {
      params.append("from", fromDate);
      params.append("to", toDate);
    }

    setLoading(true);

try {
  const raw = localStorage.getItem("token");
  let token = "";

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      token = parsed.token || raw;
    } catch {
      token = raw;
    }
  }

  console.log("✅ Final token sent:", token);

  const response = await fetch(
    `http://localhost:3000/app/admin/donor/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ FIXED!
      },
    }
  );

  const data = await response.json();
  setResults(data || []);
} catch (error) {
  console.error("Error fetching donations:", error);
  alert("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl mb-6 text-center text-indigo-700 poppins-bold">
          Search Donations
        </h1>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Donor Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Donor Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 123 456 7890"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              Amount Donated (CAD)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              From Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 poppins-semibold">
              To Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg poppins-medium transition duration-200 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {loading ? "Searching..." : "Search Donations"}
            </button>
          </div>
        </form>

        {/* Table of results */}
        {results.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((donation) => (
                  <tr key={donation._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{donation.name}</td>
                    <td className="px-4 py-2">{donation.email}</td>
                    <td className="px-4 py-2">{donation.phone}</td>
                    <td className="px-4 py-2">${donation.donation.toFixed(2)}</td>
                    <td className="px-4 py-2">{new Date(donation.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Back link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/add-donation")}
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition poppins-medium"
          >
            ← Back to Add Donation
          </button>
        </div>
      </div>
    </div>
  );
}