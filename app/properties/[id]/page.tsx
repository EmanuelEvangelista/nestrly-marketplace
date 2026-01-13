import Link from "next/link";

const PropertyPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Properties</h1>
      <Link href="/">Go Home</Link>
    </div>
  );
};
export default PropertyPage;
