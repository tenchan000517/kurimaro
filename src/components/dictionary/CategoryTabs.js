export default function CategoryTabs({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
