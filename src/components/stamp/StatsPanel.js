// components/stamp/StatsPanel.js
import PropTypes from 'prop-types';

function StatsPanel({ visitCount, completionRate }) {
  const stats = [
    {
      label: '来店回数',
      value: visitCount,
      // description: '楽しい思い出をありがとう！',
    },
    {
      label: 'コンプリート状況',
      value: `${completionRate}%`,
      // description: 'がんばってコレクションしよう！',
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-sm text-gray-700">{stat.label}</h3>
          <div className="text-2xl font-bold my-1">{stat.value}</div>
          <p className="text-xs text-gray-800">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}

StatsPanel.propTypes = {
  visitCount: PropTypes.number.isRequired,
  completionRate: PropTypes.number.isRequired,
};

export default StatsPanel;