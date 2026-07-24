import React from 'react';
import badgeAsset from '@/assets/badge-dclic-2026.png.asset.json';

type Certification = {
  title: string;
  issuer: string;
  year: string;
  badgeUrl?: string;
};

const certifications: Certification[] = [
  {
    title: 'Développement Web (Niveau débutant)',
    issuer: "D-CLIC / Ateliers du Numérique",
    year: 'Mai 2026',
    badgeUrl: badgeAsset.url,
  },
  { title: 'React Developer', issuer: 'Udemy', year: '2024' },
  { title: 'UI/UX Design', issuer: 'Auto-formation', year: '2023' },
  { title: 'JavaScript Advanced', issuer: 'Udemy', year: '2022' },
  { title: 'WordPress Expert', issuer: 'Auto-formation', year: '2018' },
];

const Certifications = () => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="text-xl font-bold mb-4 text-primary">Certifications</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="border border-border rounded p-3 hover:border-primary transition-colors flex items-center gap-3"
          >
            {cert.badgeUrl && (
              <img
                src={cert.badgeUrl}
                alt={`Badge ${cert.title}`}
                className="w-12 h-12 rounded-full object-contain flex-shrink-0"
              />
            )}
            <div>
              <h4 className="font-semibold">{cert.title}</h4>
              <p className="text-primary text-sm">{cert.issuer} | {cert.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
