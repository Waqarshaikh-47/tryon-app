import React from 'react';
import './TryOnPreview.css';

interface TryOnPreviewProps {
  virtualImage: string;
}

const TryOnPreview: React.FC<TryOnPreviewProps> = ({ virtualImage }) => {
  return (
    <div className="tryon-wrapper">
      <div className="tryon-frame">
        <img src={virtualImage} alt="Virtual Try-On" className="tryon-image" />
        <span className="ai-tag">Cenrai</span>
      </div>
    </div>
  );
};

export default TryOnPreview;
