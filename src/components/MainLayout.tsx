import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileDropContainer from './FileDropContainer';
import PreviewDownload from './PreviewDownload';

const Container = styled.div`
  margin: 0 3em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 390px;
`;

const CoverContainer = styled.div`
  width: 100%;
  background-color: #e60023;
  display: flex;
  justify-content: center;
  height: 570px;
`;

const MainContainer = styled.div`
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 2em;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
  height: 530px;

  img {
    width: 1.8em;
    margin-bottom: 0.1em;
  }

  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 190px;
  }
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const LoadingText = styled.div`
  font-size: 1.5em;
  color: #666;
  margin-top: 1em;
`;

const MainLayout = () => {
  const [source, setSource] = useState<File | null>(null);
  const [target, setTarget] = useState<File | null>(null);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState(''); // 로딩 애니메이션 상태

  const handleFileUpload = (file: File, type: 'source' | 'target') => {
    if (type === 'source') {
      setSource(file);
    } else if (type === 'target') {
      setTarget(file);
    }
  };

  // 로딩 애니메이션 효과
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + '.' : '')); // `.` → `..` → `...` 반복
      }, 500);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
    }
  }, [isLoading]);

  // 모든 파일 업로드 완료 후 자동으로 스크립트를 실행
  useEffect(() => {
    const runScript = async () => {
      if (source && target) {
        setIsLoading(true); // 로딩 시작
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
        } finally {
          setIsLoading(false); // 로딩 종료
        }
      }
    };

    runScript();
  }, [source, target]); // source와 target 상태가 변경될 때 실행

  return (
    <CoverContainer>
      <MainContainer>
        <div className="logo">
          <img src="images/logo.png" alt="" />
          <h3>AI Photo Studio</h3>
        </div>
        <h1>인물 사진 변환</h1>
        <MainContent>
          <Container>
            {!target ? (
              <FileDropContainer
                onFileUpload={handleFileUpload}
                isSourceUploaded={!!source} // source 업로드 여부 전달
              />
            ) : isLoading ? (
              <LoadingText>변환 중{loadingDots}</LoadingText> // 로딩 애니메이션 표시
            ) : (
              <PreviewDownload output={output} />
            )}
          </Container>
        </MainContent>
      </MainContainer>
    </CoverContainer>
  );
};

export default MainLayout;
