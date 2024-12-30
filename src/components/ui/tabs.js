export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 ${
            active === tab.id
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
