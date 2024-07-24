import React from 'react';
import BgMap from './components/BgMap';
import TabSwitch from './components/TabSwitch';
import CtrlPanel from './components/CtrlPanel';

const Home = () => {
  return (
    <div className="relative h-screen">
      <BgMap />
      <TabSwitch />
      <CtrlPanel />
    </div>
  );
};

export default Home;
