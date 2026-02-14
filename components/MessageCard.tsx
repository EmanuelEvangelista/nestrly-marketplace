"use client";
import { MessageType } from "@/models/Message";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

interface MessageTypeProps {
  message: MessageType;
  prevCount?: any;
}

const MessageCard = ({ message }: MessageTypeProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Messages deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };
  if (isDeleted) {
    return null;
  }

  return (
    <div>
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 round-md">
            New
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry:</span>{" "}
          {(message.property as any).name}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {" "}
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {" "}
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received:</strong>{" "}
            {new Date(message.updatedAt).toLocaleString()}
          </li>
        </ul>
        <button
          onClick={handleReadClick}
          className={`mt-4 ${isRead ? "bg-gray-300" : "bg-blue-500 text-white"} py-1 px-3 rounded-md cursor-pointer transition duration-200`}
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          onClick={handleDeleteClick}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
