// script.js
// script.js (restored minimal helpers)
const $ = (id) => document.getElementById(id);

// Execute code
document.getElementById('runButton').addEventListener('click', async () => {
  const code = document.getElementById('code').value;
  const language = document.getElementById('language-select').value;
  const stdin = (document.getElementById('stdin') && document.getElementById('stdin').value) || '';

  if (!code.trim()) {
      document.getElementById('output').textContent = 'Please write some code!';
      return;
  }

  document.getElementById('output').textContent = 'Running...';

  try {
      const resp = await fetch('http://localhost:5050/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, stdin })
      });
      const data = await resp.json();
      if (!resp.ok) {
          throw new Error(data?.error || 'Execution failed');
      }
      document.getElementById('output').textContent = data.output || data.status || 'No Output';
  } catch (err) {
      document.getElementById('output').textContent = err.message || 'Error running code';
  }
});
// Remove matrix background
