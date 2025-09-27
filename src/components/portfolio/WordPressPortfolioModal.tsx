
import React from 'react';
import { WordPressProject } from './WordPressPortfolioItem';

type WordPressPortfolioModalProps = {
  item: WordPressProject;
  onClose: () => void;
};

const WordPressPortfolioModal: React.FC<WordPressPortfolioModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-mediumGray max-w-3xl w-full rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="h-64 md:h-80 bg-lightGray relative overflow-hidden">
          {item.isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-turquoise"></div>
            </div>
          ) : null}
          <img 
            src={item.imageUrl} 
            alt={`${item.title} Logo`} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <span className="text-sm text-gray-300 font-light">{item.url}</span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
          <p className="text-gray-300 mb-6">{item.description}</p>
          <div className="flex justify-between items-center">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-turquoise hover:bg-turquoise/90 text-black px-4 py-2 rounded transition-colors"
            >
              Visiter le site
            </a>
            <button
              onClick={onClose}
              className="border border-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPressPortfolioModal;
