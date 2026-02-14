import {
  EmailShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { PropertyType } from "@/models/Property";

interface PropertyShareButtonProps {
  property: PropertyType;
}

const ShareButtons = ({ property }: PropertyShareButtonProps) => {
  // 1. Validación de seguridad al inicio
  if (!property || !property.type) {
    return null;
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <h3 className="font-semibold text-lg text-center mb-5 text-gray-800">
          Share this property
        </h3>

        <div className="flex gap-4 justify-center">
          <FacebookShareButton
            url={shareUrl}
            hashtag={`#${property.type}ForRent`}
          >
            <FacebookIcon size={42} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={property.name}
            hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
          >
            <TwitterIcon size={42} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={property.name}
            separator=":: "
          >
            <WhatsappIcon size={42} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={`Check out this property listing ${shareUrl}`}
          >
            <EmailIcon size={42} round />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
};

export default ShareButtons;
