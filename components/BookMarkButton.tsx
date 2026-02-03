"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { PropertyType } from "@/models/Property";

interface PropertyBookMarkProps {
  property: PropertyType;
}

const BookMarkButton = ({ property }: PropertyBookMarkProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookMarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sing in in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookMarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Sometihign went wrong");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  );
};

export default BookMarkButton;
