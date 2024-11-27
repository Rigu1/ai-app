import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e60023;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b8001c;
  }
`;

const RunScript: React.FC<{
  source: File;
  target: File;
  setOutput: (output: string) => void;
}> = ({ source, target, setOutput }) => {
  const handleRunScript = async () => {
    const formData = new FormData();
    formData.append('source', source);
    formData.append('target', target);
    formData.append('output', 'output.png');

    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
      } else {
        const data = await response.json();
        setOutput(`http://localhost:5000/static/${data.output}`);
      }
    } catch (error) {
      console.error('Error running the script:', error);
    }
  };

  return (
    <Container>
      <Button onClick={handleRunScript}>Run Script</Button>
    </Container>
  );
};

export default RunScript;
