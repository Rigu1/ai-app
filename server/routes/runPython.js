import { Router } from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '../../server/static/uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // 업로드 폴더 생성
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// 두 개의 파일 받기
router.post('/', upload.fields([{ name: 'target' }, { name: 'source' }]), (req, res) => {
  const files = req.files;
  
  console.log('Received files:', files);
  
  if (!files.target || !files.source) {
    return res.status(400).json({ error: 'Both target and source files are required' });
  }

  // 업로드된 파일 경로
  const target = files.target[0].path;
  const source = files.source[0].path;

  // 출력 파일 경로
  const output = path.resolve(__dirname, '../../server/public/generated/output.png');

  const scriptPath = path.resolve(__dirname, '../../roop/run.py');
  const pythonPath = path.resolve(__dirname, '../../venv/bin/python'); // Python 경로

  const command = `${pythonPath} ${scriptPath} -s ${source} -t ${target} -o ${output}`;
  console.log(`Executing command: ${command}`);

  exec(command, { cwd: path.resolve(__dirname, '../../roop') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    console.log(`Stdout: ${stdout}`);

    res.status(200).json({ output: `generated/output.png` }); // 상대 경로 반환
  });
});

export default router;
