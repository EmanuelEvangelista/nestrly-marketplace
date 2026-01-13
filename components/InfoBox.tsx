import React from "react";
import Link from "next/link";

interface ButtonInfo {
  text: string;
  link: string;
  backgroundColor: string;
}

interface InfoBoxProps {
  heading: string;
  backgroundColor?: string; // El '?' significa que es opcional
  textColor?: string;
  buttonInfo: ButtonInfo;
  children: React.ReactNode; // Tipo necesario para el contenido entre las etiquetas
}

const InfoBox: React.FC<InfoBoxProps> = ({
  heading,
  backgroundColor = "bg-yellow-200",
  textColor = "text-yellow-800",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>

      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
