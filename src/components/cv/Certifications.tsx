
import React from 'react';

type Certification = {
  title: string;
  issuer: string;
  year: string;
};

const certifications: Certification[] = [
  { title: 'React Developer', issuer: 'Udemy', year: '2024' },
  { title: 'UI/UX Design', issuer: 'Auto-formation', year: '2023' },
  { title: 'JavaScript Advanced', issuer: 'Udemy', year: '2022' },
  { title: 'WordPress Expert', issuer: 'Auto-formation', year: '2018' }
];

const Certifications = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-turquoise">Certifications</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className="border border-lightGray rounded p-3 hover:border-turquoise transition-colors">
            <h4 className="font-semibold">{cert.title}</h4>
            <p className="text-turquoise text-sm">{cert.issuer} | {cert.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
