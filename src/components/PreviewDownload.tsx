import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  width: 240px; /* 부모 컨테이너 크기 */
  height: 300px; /* 부모 컨테이너 크기 */
  background-color: #f9f9f9; /* 로딩 전 배경색 */
`;

const Image = styled.img`
  width: 100% !important; /* 강제로 적용 */
  height: 100% !important; /* 강제로 적용 */
  object-fit: cover; /* 컨테이너에 맞게 채움 */
  display: block; /* 기본 스타일 초기화 */
  all: unset; /* 브라우저 기본 스타일 초기화 */
`;

const DownloadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e60023;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #a63023;
  }
`;

const PreviewDownload: React.FC<{ output: string }> = ({ output }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(output);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = output.split('/').pop() || 'download.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  if (!output) {
    return null; // 출력 파일이 없으면 아무 것도 렌더링하지 않음
  }

  return (
    <Container>
      <ImageWrapper>
        <Image src={output} alt="output" />
      </ImageWrapper>
      <DownloadButton onClick={handleDownload}>
        Download
      </DownloadButton>
    </Container>
  );
};

export default PreviewDownload;
