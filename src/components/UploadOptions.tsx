import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .upload {
    margin: 1em 0;
    padding: 1em;
    white-space: nowrap;
  }
`;

const UploadOptions = ({ 
  setSource, 
  setTarget 
}: { 
  setSource: (source: File) => void, 
  setTarget: (target: File) => void 
}) => {
  const handleSourceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSource(event.target.files[0]);
    }
  };

  const handleTargetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setTarget(event.target.files[0]);
    }
  };

  return (
    <Container>
      <input 
        className="upload" 
        type="file" 
        onChange={handleTargetUpload} 
        placeholder="Upload Target File" 
      />
      <input 
        className="upload" 
        type="file" 
        onChange={handleSourceUpload} 
        placeholder="Upload Source File" 
      />
    </Container>
  );
};

export default UploadOptions;
