
import React from 'react';

type Language = {
  name: string;
  level: string;
};

const languages: Language[] = [
  { name: 'Français', level: 'Courant' },
  { name: 'Anglais', level: 'Professionnel' },
  { name: 'Swahili', level: 'Natif' },
];

const Languages = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h4 className="font-semibold text-turquoise mb-4">Langues</h4>
      <ul className="space-y-2">
        {languages.map((lang, index) => (
          <li key={index}>{lang.name} - {lang.level}</li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
