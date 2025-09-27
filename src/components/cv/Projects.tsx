
import React from 'react';

type Project = {
  title: string;
  description: string;
};

const projects: Project[] = [
  {
    title: 'Goma Webradio',
    description: 'Développement d\'un site web d\'information couplé à une radio en ligne, offrant un accès direct à l\'actualité locale et aux émissions en streaming.'
  },
  {
    title: 'GOWERA',
    description: 'Un projet visant à offrir une plateforme de streaming radio gratuite, connectant les auditeurs aux stations du monde entier en un clic.'
  },
  {
    title: 'Thème WordPress Premium',
    description: 'Conception et développement d\'un thème WordPress pour professionnels.'
  }
];

const Projects = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-turquoise">Projets Personnels</h3>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index}>
            <h4 className="font-semibold">{project.title}</h4>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
