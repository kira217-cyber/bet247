import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router";

const MobileInbox = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center">
        <span className="mr-2 w-28 ">
          <Link to={"/"}>
            <FaArrowCircleLeft size={20} />
          </Link>
        </span>{" "}
        <span>Inbox</span>
      </div>
      <div className="h-32 flex items-center justify-center space-y-4 bg-black">
        {/* Message 1 */}
        <p className="text-center text-white">No Message</p>
      </div>
    </div>
  );
};

export default MobileInbox;
