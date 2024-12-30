// components/stamp/StampCard.js
import PropTypes from 'prop-types';

function StampCard({ stamps = [], totalStamps = 12 }) {  // stampsにデフォルト値を設定
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: totalStamps }).map((_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg border-2 border-dashed 
              ${stamps[index] ? 'border-none bg-blue-500' : 'border-gray-400'} 
              flex items-center justify-center`}
          >
            {stamps[index] ? (
              <img
                src={stamps[index].imageUrl}
                alt={`スタンプ ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-800 text-sm">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

StampCard.propTypes = {
  stamps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalStamps: PropTypes.number,
};

export default StampCard;