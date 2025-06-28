import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Reskin() {
  const { template } = useParams();
  const gameTitle = template.replace(/-/g, ' ');

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">Customize {gameTitle}</h2>
      <p className="mb-6">This is where AI-based reskin options will appear.</p>
      <Link to="/" className="text-blue-600 hover:underline">Back to home</Link>
    </div>
  );
}

export default Reskin;
