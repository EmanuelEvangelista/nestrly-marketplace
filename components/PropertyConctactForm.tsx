"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { PropertyType } from "@/models/Property";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface PropertyFormContactProps {
  property: PropertyType;
}

const PropertyConctactForm = ({ property }: PropertyFormContactProps) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      body: message,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("Message sent successf");
        setWasSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        const dataResponse = await res.json();
        toast.error(dataResponse.message);
      } else {
        toast.error("Error sending form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Contact Property Manager
      </h3>

      {!session ? (
        <p className="text-gray-500">You must be logged in to send a message</p>
      ) : wasSubmitted ? (
        <p className="text-emerald-600 font-medium mb-4">
          Your message has been sent successfully
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Name
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Phone
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-gray-700 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl w-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            type="submit"
          >
            <FaPaperPlane className="mr-2" />
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyConctactForm;
