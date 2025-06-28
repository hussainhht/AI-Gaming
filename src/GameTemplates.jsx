import React from 'react';

// 1x1 transparent pixel used as a placeholder image
const placeholderImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/D/PwAI/wP+cNRzRwAAAABJRU5ErkJggg==';

const templates = [
  { id: 'flappy', title: 'Flappy Bird', image: placeholderImg },
  { id: 'runner', title: 'Speed Runner', image: placeholderImg },
  { id: 'whack', title: 'Whack-a-Mole', image: placeholderImg },
  { id: 'match3', title: 'Match-3', image: placeholderImg },
  { id: 'crossy', title: 'Crossy Road', image: placeholderImg }
];

export default function GameTemplates() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose a Game Template</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map(t => (
          <div key={t.id} className="border rounded shadow p-4 flex flex-col items-center">
            <img src={t.image} alt={t.title} className="h-32 w-auto mb-2 object-cover" />
            <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
            <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Customize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
