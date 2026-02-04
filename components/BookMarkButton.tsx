"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PropertyType } from "@/models/Property";
import { Oval } from "react-loader-spinner";

interface PropertyBookMarkProps {
  property: PropertyType;
}

const BookMarkButton = ({ property }: PropertyBookMarkProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookMarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
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
          setIsBookMarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

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

  if (loading)
    return (
      <div className="flex justify-center items-center w-full py-2">
        <Oval
          height={25}
          width={25}
          color="#3b82f6"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d1d5db"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    );

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaRegBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  );
};

export default BookMarkButton;
