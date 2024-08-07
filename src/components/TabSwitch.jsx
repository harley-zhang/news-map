import React, { useState } from 'react';
import BgMap from './BgMap';

const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <BgMap showLayer="all" />;
      case 'tab2':
        return <BgMap showLayer="ztca" />;
      case 'tab3':
        return (
          <div className="bg-white h-full flex justify-center items-center z-30">
            <p>Lorem Ipsum</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 bg-white rounded-full shadow-md p-2 flex items-center text-sm">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('tab1')}
            className={`px-6 py-3 rounded-full ${activeTab === 'tab1' ? 'bg-gray-300' : 'bg-white'} transition duration-300 ease-in-out`}
          >
            Individual stories
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className={`px-6 py-3 rounded-full ${activeTab === 'tab2' ? 'bg-gray-300' : 'bg-white'} transition duration-300 ease-in-out`}
          >
            By neighborhood
          </button>
          <button
            onClick={() => setActiveTab('tab3')}
            className={`px-6 py-3 rounded-full ${activeTab === 'tab3' ? 'bg-gray-300' : 'bg-white'} transition duration-300 ease-in-out`}
          >
            Summaries
          </button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default TabSwitch;