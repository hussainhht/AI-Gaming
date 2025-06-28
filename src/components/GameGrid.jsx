import React from 'react';
import GameCard from './GameCard.jsx';

const games = [
  { title: 'Flappy Bird', template: 'flappy-bird' },
  { title: 'Speed Runner', template: 'speed-runner' },
  { title: 'Whack-a-Mole', template: 'whack-a-mole' },
  { title: 'Match-3', template: 'match-3' },
  { title: 'Crossy Road', template: 'crossy-road' },
];

function GameGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.template}
          title={game.title}
          image={`https://via.placeholder.com/200?text=${encodeURIComponent(game.title)}`}
          template={game.template}
        />
      ))}
    </div>
  );
}

export default GameGrid;
