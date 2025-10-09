import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface StarRatingProps {
  projectId?: string;
  projectName?: string;
  readonly?: boolean;
  initialRating?: number;
  showCount?: boolean;
}

const StarRating = ({ 
  projectId, 
  projectName = "ce projet",
  readonly = false, 
  initialRating = 0,
  showCount = true 
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = (value: number) => {
    if (readonly) return;
    
    setRating(value);
    toast.success(`Merci d'avoir donné ${value} étoile${value > 1 ? 's' : ''} à ${projectName}!`);
    
    // Ici vous pouvez ajouter la logique pour sauvegarder dans la base de données
    if (projectId) {
      console.log(`Rating ${value} stars for project ${projectId}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            disabled={readonly}
            className={`transition-all duration-200 ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <Star
              size={20}
              className={`${
                star <= (hover || rating)
                  ? 'fill-turquoise text-turquoise'
                  : 'text-gray-400'
              } transition-colors duration-200`}
            />
          </button>
        ))}
      </div>
      {showCount && rating > 0 && (
        <span className="text-sm text-gray-400">
          ({rating}/5)
        </span>
      )}
    </div>
  );
};

export default StarRating;
