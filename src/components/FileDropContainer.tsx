import React from 'react';
import styled from 'styled-components';

// 스타일링 설정
const Container = styled.div`
  background-color: #fff;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 3em;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;

  width: 100%;
  height: 100%;

  img {
    width: 150px;
  }

  &:hover {
    border-color: #e60023;
  }
`;

const Text = styled.p`
  font-size: 1.2em;
  color: #666;
  margin: 1em 0;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  margin-top: 1em;
  padding: 10px 20px;
  background-color: #1877f2;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: #145db6;
  }
`;

const Icon = styled.img`
  width: 150px !important;
  height: 150px !important;
  margin-bottom: 1em;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;


const FileDropContainer: React.FC<{
  onFileUpload: (file: File, type: 'source' | 'target') => void;
  isSourceUploaded: boolean;
}> = ({ onFileUpload, isSourceUploaded }) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'source' | 'target',
  ) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0], type);
    }
  };

  return (
    <Container>
      {!isSourceUploaded ? (
        <>
          {/* 인물 사진 업로드 */}
          <Icon src="images/person.svg" alt="background" />
          <Text>인물 사진을 업로드하세요</Text>
          <FileInput
            id="sourceUpload"
            type="file"
            onChange={(e) => handleFileChange(e, 'source')}
          />
          <Label htmlFor="sourceUpload">인물 사진 파일 선택</Label>
        </>
      ) : (
        <>
          {/* 배경 사진 업로드 */}
          <Icon src="images/wallpaper.png" alt="person" />
          <Text>배경 사진을 업로드하세요</Text>
          <FileInput
            id="targetUpload"
            type="file"
            onChange={(e) => handleFileChange(e, 'target')}
          />
          <Label htmlFor="targetUpload">배경 사진 파일 선택</Label>
        </>
      )}
    </Container>
  );
};

export default FileDropContainer;
