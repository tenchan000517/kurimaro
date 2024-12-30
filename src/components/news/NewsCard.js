// components/news/NewsCard.js
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NewsCard({ title, content, date, image, isExpanded: defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (isExpanded) {
    return (
      <article className="bg-white rounded-xl shadow overflow-hidden">
        {image && (
          <div className="relative w-full aspect-video">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="text-base font-medium text-gray-900 mb-2">
            {formatDate(date)}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          <div className="prose prose-sm max-w-none text-gray-900"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 text-base"
          >
            <ChevronUp className="w-5 h-5 mr-1" />
            閉じる
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex h-32">
        {image && (
          <div className="w-48 flex-shrink-0">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {formatDate(date)}
            </div>
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
              {title}
            </h2>
          </div>
          
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm self-end"
          >
            <ChevronDown className="w-4 h-4 mr-1" />
            もっと見る
          </button>
        </div>
      </div>
    </article>
  );
}