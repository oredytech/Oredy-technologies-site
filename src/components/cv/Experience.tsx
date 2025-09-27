
import React from 'react';

type Job = {
  title: string;
  company: string;
  period: string;
  description: string;
};

const jobs: Job[] = [
  {
    title: 'Directeur Technique',
    company: 'KAKO Fm',
    period: 'Septembre 2025 - Aujourd\'hui',
    description: 'Gestion des équipements techniques de radiodiffusion et supervision de l\'équipe technique pour assurer une diffusion optimale des programmes.'
  },
  {
    title: 'Enseignant',
    company: 'UCNDK',
    period: '2025 - Présent',
    description: 'Donneur du cours de conception et gestion des sites web aux étudiants de la Science de l\'information et de la communication.'
  },
  {
    title: 'Développeur Frontend Senior',
    company: 'OREDY Technologies',
    period: '2020 - Présent',
    description: 'Développement de sites web dynamiques et responsives, intégration de CMS, gestion de projets web, collaboration avec des clients internationaux.'
  },
  {
    title: 'Radio Diffuseur',
    company: 'Radio TAYNA',
    period: '2018 - 2024',
    description: 'Passionné par la technique et la transmission, j\'ai veillé à ce que chaque onde porte une histoire, chaque fréquence une émotion.'
  },
  {
    title: 'Webmaster',
    company: 'Radio TAYNA',
    period: '2022 - 2024',
    description: 'Gestion et mise à jour de contenu web, administration de CMS WordPress, création de newsletters, et Maintenance du site web.'
  }
];

const Experience = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-turquoise">Expérience Professionnelle</h3>
      
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div key={index} className="border-l-2 border-turquoise pl-4 relative">
            <div className="absolute w-3 h-3 bg-turquoise rounded-full -left-[7px] top-0"></div>
            <h4 className="font-semibold">{job.title}</h4>
            <p className="text-turquoise text-sm mb-2">{job.company} | {job.period}</p>
            <p className="text-gray-300 text-sm">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
