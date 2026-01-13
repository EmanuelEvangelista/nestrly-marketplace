// "use client";
// const PropertyPage: React.FC = () => {
//   return <div>PropertyPage</div>;
// };

// export default PropertyPage;

// "use client";
// import React from "react";

// 1. Definimos la interface para los parámetros de la URL
interface PropertyPageProps {
  params: {
    id: string;
  };
}

// 2. Pasamos la interface al componente
const PropertyPage: React.FC<PropertyPageProps> = ({ params }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Detalles de la Propiedad</h1>
      <p>Estás viendo la propiedad con ID: {params.id}</p>
    </div>
  );
};

export default PropertyPage;
