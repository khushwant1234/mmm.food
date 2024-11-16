'use client';

import { useState } from 'react';

export default function ImageSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchImages = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/search-images?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setImages(data.images_results || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Search</h1>

      <form onSubmit={searchImages} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border rounded overflow-hidden">
            <img
              src={image.thumbnail}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="text-sm truncate">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
