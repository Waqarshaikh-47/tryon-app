import React from 'react';

// Define the interface for a clothing item
interface ClothingItem {
    image: string;
    name: string;
}

interface ClothingChoicesProps {
    clothingItems: ClothingItem[];
    onSelectClothing: (item: ClothingItem) => void;
}

const ClothingChoices: React.FC<ClothingChoicesProps> = ({ clothingItems, onSelectClothing }) => {
    return (
        <div className="container py-5">
            <h3 className="text-center mb-4 fashionable-text">
                Let’s Get Fashionable!
            </h3>

            <div className="row g-4 mt-3 justify-content-center">
                {clothingItems.map((item, index) => (
                    <div key={index} className="col-12 col-md-4 col-lg-4 d-flex justify-content-center">
                        <div
                            className="card shadow-lg rounded-4 border-0 text-center p-3 hover-zoom"
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease-in-out',
                                height: '100%',
                                maxWidth: '300px', // Make the card bigger
                            }}
                            onClick={() => onSelectClothing(item)}
                        >
                            <div
                                className="d-flex justify-content-center align-items-center mb-3"
                                style={{ height: '250px', position: 'relative' }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid"
                                    style={{
                                        objectFit: 'contain',
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                            </div>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <p className="card-text" style={{ fontSize: '1rem', color: '#555', fontWeight: 'bold' }}>
                                    Try it on
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClothingChoices;
