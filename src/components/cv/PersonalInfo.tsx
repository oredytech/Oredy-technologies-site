
import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-lightGray mb-4 overflow-hidden">
          <img 
            src="/lovable-uploads/cf0c9765-b0b7-401c-95ef-ca0fe62ee39d.png" 
            alt="OREDY" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">OREDY MUSANDA</h3>
        <p className="text-turquoise">Développeur Frontend</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-turquoise mb-2">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: contact@oredytech.com</li>
            <li>Téléphone: +243 996 886 079</li>
            <li>Localisation: Goma, RDC/NORD-KIVU</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
