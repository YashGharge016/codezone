const axios = require('axios');

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

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { language, code, stdin } = req.body || {};
    
    if (!language || !code) {
      return res.status(400).json({ error: 'language and code are required' });
    }
    
    const languageId = LANGUAGE_MAP[language];
    if (!languageId) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

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
    console.error('API Error:', err);
    const msg = err.response?.data?.message || err.message || 'Execution error';
    res.status(500).json({ error: msg });
  }
};
