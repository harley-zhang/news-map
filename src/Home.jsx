import React from 'react';
import TabSwitch from './components/TabSwitch';
import CtrlPanel from './components/CtrlPanel';


const Home = () => {
  return (
    <div className="relative h-screen">
      <TabSwitch />
      <CtrlPanel />
    </div>
  );
};

export default Home;
