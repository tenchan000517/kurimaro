// components/dictionary/CreatureCard.js
import PropTypes from 'prop-types';
import Link from 'next/link';

function CreatureCard({ id, name, imageUrl, category, isCollected }) {
  return (
    <Link href={`/dictionary/${id}`} className="block">
      <div className="relative aspect-[63/88] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className={`absolute inset-0 ${!isCollected ? 'grayscale' : ''}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-white/90 text-xs">No.{String(id).padStart(3, '0')}</p>
        </div>
      </div>
    </Link>
  );
}

CreatureCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isCollected: PropTypes.bool.isRequired
};

export default CreatureCard;