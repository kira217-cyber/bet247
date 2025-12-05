import React, { useContext } from "react";
import { FaAndroid } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const Footer = () => {
  const { footer } = useContext(AuthContext);
  const { footerFontSize, footerTextColor } = footer;
  return (
    <footer className="bg-white border-t text-gray-700 text-sm mb-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3 text-center md:text-left">
        {/* Gaming License */}
        <div>
          <h3 className="font-semibold mb-2">Gaming License</h3>
          <img
            src="https://i.ibb.co.com/NgDVBJJK/gaming-curacao-gc-license-logo.png"
            alt="Gaming License"
            className="h-10 mx-auto md:mx-0"
          />
        </div>

        {/* Responsible Gaming */}
        <div>
          <h3 className="font-semibold mb-2">Responsible Gaming</h3>
          <div className="flex justify-center md:justify-start gap-3">
            <img
              src="https://i.ibb.co.com/rR2PFVcL/pngtree-18-icon-png-image-6212805.png"
              alt="18+"
              className="h-8"
            />
            <img
              src="https://i.ibb.co.com/sJpTpTx6/Gam-Care-Logo-CMYK.png"
              alt="GamCare"
              className="h-8"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-semibold mb-2">Payment Methods</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <img
              src="https://i.ibb.co.com/v4DkM6Ss/pngtree-vector-bank-icon-png-image-708538.jpg"
              alt="Bank"
              className="h-8 hover:cursor-pointer"
            />
            <img
              src="https://i.ibb.co.com/4wyV8NWk/Bkash-Logo.jpg"
              alt="Bkash"
              className="h-8 hover:cursor-pointer"
            />
            <img
              src="https://i.ibb.co.com/MKG5MYM/vectorseek-com-Nagad-Logo-Vector.png"
              alt="Nagad"
              className="h-8 hover:cursor-pointer"
            />
            <img
              src="https://i.ibb.co.com/JW6pKzNd/dutch-bangla-rocket-logo-png-seeklogo-317692.png"
              alt="Rocket"
              className="h-8 hover:cursor-pointer"
            />
            <img
              src="https://i.ibb.co.com/20C7SY9b/images.png"
              alt="Upay"
              className="h-8 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div
        style={{
          color: footerTextColor,
          fontSize: `${footerFontSize}px`,
        }}
        className=" py-4"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms and Conditions
          </a>
          <a href="#" className="hover:underline">
            Rules and Regulations
          </a>
          <a href="#" className="hover:underline">
            KYC
          </a>
          <a href="#" className="hover:underline">
            Responsible Gaming
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Self-Exclusion Policy
          </a>
          <a href="#" className="hover:underline">
            Underage Policy
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <img
            src="https://i.ibb.co.com/6RLFCrmb/Betfair-Broker-1.jpg"
            alt="Betfair"
            className="h-5"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg text-sm">
            <FaAndroid /> Download Android App
          </button>
          <span>v1.11 - 2022-03-23 - 3.1MB</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
