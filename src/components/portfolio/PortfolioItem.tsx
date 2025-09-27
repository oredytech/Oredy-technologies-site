
import React from 'react';

type PortfolioItemProps = {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
  description: string;
  technologies: string[];
  isLoading: boolean;
  onClick: () => void;
};

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  imageUrl,
  url,
  description,
  technologies,
  isLoading,
  onClick
}) => {
  return (
    <div 
      className="bg-mediumGray rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-turquoise/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-lightGray relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-turquoise"></div>
          </div>
        ) : null}
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <span className="text-xs text-gray-300 font-light">{url}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="text-xs bg-darkGray px-2 py-1 rounded-full text-turquoise">
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-turquoise hover:underline inline-block text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Voir le projet
        </a>
      </div>
    </div>
  );
};

export default PortfolioItem;
