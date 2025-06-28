import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ title, image, template }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Link
          to={`/reskin/${template}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Customize
        </Link>
      </div>
    </div>
  );
}

export default GameCard;
