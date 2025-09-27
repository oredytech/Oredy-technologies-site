
import React from 'react';

type EducationItem = {
  title: string;
  institution: string;
  period: string;
  description: string;
};

const educationItems: EducationItem[] = [
  {
    title: 'Autodidacte en Développement Web',
    institution: 'Sites des formations en ligne',
    period: '2017 - Présent',
    description: 'Spécialisation en technologies web modernes, gestion de projets numériques.'
  },
  {
    title: 'Graguat en Communication',
    institution: 'Université du CAPROMAD',
    period: '2020 - 2023',
    description: 'Formation générale en communication, Journalisme et Marketing.'
  }
];

const Education = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-turquoise">Formation</h3>
      
      <div className="space-y-6">
        {educationItems.map((item, index) => (
          <div key={index} className="border-l-2 border-turquoise pl-4 relative">
            <div className="absolute w-3 h-3 bg-turquoise rounded-full -left-[7px] top-0"></div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-turquoise text-sm mb-2">{item.institution} | {item.period}</p>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
