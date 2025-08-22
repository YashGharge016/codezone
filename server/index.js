import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Map UI language values to Judge0 language IDs
const LANGUAGE_MAP = {
  javascript: 63, // Node.js
  python: 71, // Python (3.8.1)
  c: 50, // C (GCC 9.2.0)
  cpp: 54 // C++ (GCC 9.2.0)
};

const JUDGE0_BASE = process.env.JUDGE0_BASE_URL || 'https://ce.judge0.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';

function judge0Headers() {
  if (JUDGE0_BASE.includes('rapidapi.com')) {
    if (!RAPIDAPI_KEY) {
      throw new Error('RAPIDAPI_KEY is required for Judge0 RapidAPI endpoint');
    }
    return {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    };
  }
  return { 'Content-Type': 'application/json' };
}

app.post('/api/execute', async (req, res) => {
  const { language, code, stdin } = req.body || {};
  try {
    if (!language || !code) {
      return res.status(400).json({ error: 'language and code are required' });
    }
    const languageId = LANGUAGE_MAP[language];
    if (!languageId) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // Submit code for execution
    // Normalize stdin: many programs expect a trailing newline
    const stdinNormalized = typeof stdin === 'string' && stdin.length > 0
      ? (stdin.endsWith('\n') ? stdin : `${stdin}\n`)
      : '';

    const createResp = await axios.post(
      `${JUDGE0_BASE}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
        stdin: stdinNormalized
      },
      { headers: judge0Headers(), timeout: 20000 }
    );

    const { stdout, stderr, compile_output, status, time, memory } = createResp.data || {};
    const statusDesc = status?.description || 'Unknown';

    let output = '';
    if (compile_output) output += compile_output;
    if (stderr) output += (output ? '\n' : '') + stderr;
    if (stdout) output += (output ? '\n' : '') + stdout;
    if (!output) output = statusDesc;

    res.json({ output, status: statusDesc, time, memory });
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Execution error';
    res.status(500).json({ error: msg });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`CodeZone backend listening on http://localhost:${PORT}`);
});


