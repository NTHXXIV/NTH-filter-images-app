import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"]; // Replace with your own images

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Image Search</h1>
      <input
        type="text"
        placeholder="Search images"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <img key={image} src={image} alt={image} className="rounded-md" />
        ))}
      </div>
    </div>
  );
}

export default App;
