import React, { useState } from "react";
// import HeroCarousel from "./HeroCarousel";
import { Play } from "lucide-react";
import "./Gallery.css";

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("all");

  // Gallery items with images and videos
  const galleryItems = [
    {
      id: 1,
      type: "image",
      category: "vehicles",
      image: "https://images.unsplash.com/photo-1677933483348-e98d4bd7c371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBkdWJhaSUyMGR1bmUlMjBidWdneXxlbnwxfHx8fDE3NzAwMjA4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Dune Buggy Adventure"
    },
    {
      id: 2,
      type: "image",
      category: "vehicles",
      image: "https://images.unsplash.com/photo-1703060565984-cca98b1fa2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFkJTIwYmlraW5nJTIwZGVzZXJ0JTIwc2FuZHxlbnwxfHx8fDE3NzAwMjA4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Quad Biking Experience"
    },
    {
      id: 3,
      type: "video",
      category: "safari",
      image: "https://images.unsplash.com/photo-1762198455051-2a971714e291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBkZXNlcnQlMjBzdW5zZXQlMjBkdWJhaXxlbnwxfHx8fDE3NzAwMjA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "ATV Desert Sunset",
      videoUrl: "#"
    },
    {
      id: 4,
      type: "image",
      category: "safari",
      image: "https://images.unsplash.com/photo-1760529697940-45dfa4f1cd84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBhZHZlbnR1cmUlMjBjYW1lbHxlbnwxfHx8fDE3NzAwMjA4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Camel Safari Experience"
    },
    {
      id: 5,
      type: "image",
      category: "desert",
      image: "https://images.unsplash.com/photo-1690942566357-90489170ebd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kJTIwZHVuZXMlMjBnb2xkZW4lMjBkZXNlcnR8ZW58MXx8fHwxNzcwMDIwODM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Golden Sand Dunes"
    },
    {
      id: 6,
      type: "image",
      category: "vehicles",
      image: "https://images.unsplash.com/photo-1764053000942-9ea3764c8b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZyb2FkJTIwdmVoaWNsZSUyMGRlc2VydCUyMHJhY2luZ3xlbnwxfHx8fDE3NzAwMjA4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Offroad Desert Racing"
    },
    {
      id: 7,
      type: "video",
      category: "safari",
      image: "https://images.unsplash.com/photo-1708143901533-cbec951a2042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGRlc2VydCUyMG5pZ2h0JTIwc2FmYXJpfGVufDF8fHx8MTc3MDAyMDgzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Desert Night Safari",
      videoUrl: "#"
    },
    {
      id: 8,
      type: "image",
      category: "vehicles",
      image: "https://images.unsplash.com/flagged/photo-1566353820556-a53008aa8392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwYmlrZSUyMGRlc2VydCUyMGp1bXB8ZW58MXx8fHwxNzcwMDIwODM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Dirt Bike Desert Jump"
    },
    {
      id: 9,
      type: "image",
      category: "safari",
      image: "https://images.unsplash.com/photo-1769093173089-ef6cd962527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBjYW1wJTIwZmlyZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MDAyMDgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Traditional Desert Camp"
    },
    {
      id: 10,
      type: "video",
      category: "vehicles",
      image: "https://images.unsplash.com/photo-1761860466845-b81cdd7bd476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHw0eDQlMjBkZXNlcnQlMjBleHBlZGl0aW9ufGVufDF8fHx8MTc3MDAyMDgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "4x4 Desert Expedition",
      videoUrl: "#"
    },
    {
      id: 11,
      type: "image",
      category: "desert",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1080&h=720&fit=crop&auto=format",
      title: "Desert Landscape"
    },
    {
      id: 12,
      type: "image",
      category: "vehicles",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&h=720&fit=crop&auto=format",
      title: "Polaris RZR Action"
    }
  ];

  // Filter items
  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => 
        filter === "videos" ? item.type === "video" : item.category === filter
      );

  return (
    <div className="gallery-page">
      {/* <HeroCarousel title="GALLERY" subtitle="Home → Gallery" / */}

      <div className="gallery-container">
        {/* Filter Buttons */}
        <div className="gallery-filters">
          <button 
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button 
            className={filter === "vehicles" ? "active" : ""}
            onClick={() => setFilter("vehicles")}
          >
            Vehicles
          </button>
          <button 
            className={filter === "safari" ? "active" : ""}
            onClick={() => setFilter("safari")}
          >
            Safari
          </button>
          <button 
            className={filter === "desert" ? "active" : ""}
            onClick={() => setFilter("desert")}
          >
            Desert
          </button>
          <button 
            className={filter === "videos" ? "active" : ""}
            onClick={() => setFilter("videos")}
          >
            Videos
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => setSelectedItem(item)}
            >
              <div className="gallery-item-wrapper">
                <img src={item.image} alt={item.title} loading="lazy" />
                
                {/* Video Play Icon Overlay */}
                {item.type === "video" && (
                  <div className="video-overlay">
                    <div className="play-button">
                      <Play size={40} fill="#fbbf24" color="#fbbf24" />
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <span className="gallery-badge">
                    {item.type === "video" ? "VIDEO" : "PHOTO"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="lightbox" onClick={() => setSelectedItem(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox-close"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
              
              {selectedItem.type === "video" ? (
                <div className="lightbox-video">
                  <video controls autoPlay>
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img src={selectedItem.image} alt={selectedItem.title} />
              )}
              
              <div className="lightbox-info">
                <h3>{selectedItem.title}</h3>
                <span className="lightbox-type">
                  {selectedItem.type === "video" ? "VIDEO" : "PHOTO"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;