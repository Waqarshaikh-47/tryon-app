// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoUpload from './components/PhotoUpload';
import ClothingChoices from './components/ClothingChoices';
import TryOnPreview from './components/TryOnPreview';

interface ClothingItem {
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string>(''); // This will store the image URL now
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [virtualImage, setVirtualImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const clothingItems: ClothingItem[] = [
    {
      name: "T-Shirt 1",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1741944338_9318214.jpg"
    },
    {
      name: "T-Shirt 2",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1744905622_1446257.jpg"
    },
    {
      name: "T-Shirt 3",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730283592_2313955.jpg?format=webp&w=480&dpr=1.5"
    },
    {
      name: "T-Shirt 4",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725946652_7866777.jpg"
    }, {
      name: "T-Shirt 1",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1741944338_9318214.jpg"
    },
    {
      name: "T-Shirt 2",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1744905622_1446257.jpg"
    },
    {
      name: "T-Shirt 3",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730283592_2313955.jpg?format=webp&w=480&dpr=1.5"
    },
    {
      name: "T-Shirt 4",
      image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725946652_7866777.jpg"
    }
  ];

  const getVirtualTryOnImage = async (clothImage: string, modelImage: string) => {
    console.log('Cloth Image:', clothImage);
    console.log('Model Image:', modelImage);
  
    try {
      setIsLoading(true);
  
      const response = await axios.post('/api/virtual-tryon', {
        clothImage,
        modelImage,
        clothType: 'tops', // or 'bottoms' if that's the correct type
      });
  
      const { image_check_url } = response.data;
  
      let attempts = 0;
      const maxAttempts = 4;
      const interval = 12000;
  
      const checkImageStatus = async () => {
        if (attempts >= maxAttempts) {
          console.error('Max attempts reached. Image not ready.');
          setIsLoading(false);
          return;
        }
  
        attempts++;
        try {
          const statusResponse = await axios.get(image_check_url);
          if (statusResponse.data.ready) {
            setVirtualImage(statusResponse.data.image_url);
            setIsLoading(false);
          } else {
            setTimeout(checkImageStatus, interval);
          }
        } catch (error) {
          console.error('Error checking image status:', error);
          setIsLoading(false);
        }
      };
  
      checkImageStatus();
    } catch (error) {
      console.error('Error requesting virtual try-on:', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedClothing && userImage) {
      getVirtualTryOnImage(selectedClothing.image, userImage);
    }
  }, [selectedClothing, userImage]);
  

  return (
    <div>
      <div className="custom-navbar">Virtual Try-On</div>

      {/* Upload Section */}
      {!userImage && <PhotoUpload onUpload={setUserImage} setIsLoading={setIsLoading} />}

      {/* Clothing Choices Section */}
      {userImage && !selectedClothing && (
        <ClothingChoices clothingItems={clothingItems} onSelectClothing={setSelectedClothing} />
      )}

      {/* Loading Spinner (Centered Overlay) */}
      {isLoading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      )}

      {/* Try-On Preview Section */}
      {virtualImage && !isLoading && (
        <TryOnPreview  virtualImage={virtualImage} />
      )}
    </div>
  );
};

export default App;
