import React from 'react';
import dayjs from 'dayjs';
import { PhotoMetadata, exifDateFormat, userDateFormat } from 'includes';
import './PhotoFrame.css';

type props = {
  pm: PhotoMetadata;
};

const PhotoFrame = ({pm}: props ) => {
  const filepath = pm.filepath;
  const file = pm.filename + pm.fileExt;
  const renderMetadata = () => {
    const date = dayjs(pm.dateCreated, exifDateFormat).format(userDateFormat);
    return (
      <ul>
        <li key={0}><strong>Filename:</strong> {file}</li>
        <li key={1}><strong>Created:</strong> {date}</li>
      </ul>
    )
  }
  return (
    <div className="photoFrame">
      <img
        key={filepath}
        src={`file://${filepath}`}
        alt={file}
      />
      {renderMetadata()}
    </div>
  )
}

export default PhotoFrame;
