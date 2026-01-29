import React from "react";
import Image from "next/image";

interface PropertyHeaderImageProps {
  image: string;
  name: string;
}

const PropertyHeaderImage = ({ image, name }: PropertyHeaderImageProps) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt={name}
            className="object-cover w-full h-96 rounded-b-lg"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
