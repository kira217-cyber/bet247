import React from 'react';
import MobileInbox from './Components/MobileInbox';
import DesktopInbox from './Components/DesktopInbox';

const Inbox = () => {
    return (
        <div>
      <div className="hidden md:block mt-28">
        <DesktopInbox></DesktopInbox>
      </div>
      <div className="md:hidden mt-12">
        <MobileInbox></MobileInbox>
      </div>
    </div>
    );
};

export default Inbox;