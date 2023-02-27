import React from 'react';
import { SiDatadog } from 'react-icons/si';

const GenericLoading = () => {
  return (
    <div className="text-black bg-white" style={{ height: '100vh' }}>
      <div className="flex justify-center py-24">
        <SiDatadog className="pulsate-fwd" style={{ fontSize: '250px' }} />
      </div>
    </div>
  );
};

export default GenericLoading;
