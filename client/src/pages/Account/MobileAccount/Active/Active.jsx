import React from 'react';
import { FaRegClipboard } from 'react-icons/fa';

const Active = () => {
    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col items-center">
              {/* No Data Section */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <FaRegClipboard className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-400">No Data</p>
              </div>
            </div>
    );
};

export default Active;