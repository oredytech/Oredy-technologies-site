
import React from 'react';

type Skill = {
  name: string;
  level: number;
};

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'WordPress', level: 95 },
  { name: 'UI/UX Design', level: 80 },
];

const Skills = () => {
  return (
    <div className="bg-mediumGray p-6 rounded-lg">
      <h4 className="font-semibold text-turquoise mb-4">Compétences</h4>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <p className="mb-1 flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </p>
            <div className="h-2 bg-lightGray rounded">
              <div 
                className="h-full bg-turquoise rounded" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
