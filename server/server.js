import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import runPythonRouter from './routes/runPython.js';
import bodyParser from 'body-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// 현재 작업 디렉토리 출력
console.log(`Current working directory: ${process.cwd()}`);

// HTTP 요청 로깅
app.use(morgan('dev'));

// CORS 설정
app.use(cors());

// JSON 요청 본문 파싱 (크기 제한 설정)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 정적 파일 제공 설정
app.use('/static', express.static(path.join(__dirname, 'public')));

// API 엔드포인트 설정
app.use('/api/run', runPythonRouter);

// 기본 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
