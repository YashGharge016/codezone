// script.js
// script.js (restored minimal helpers)
const $ = (id) => document.getElementById(id);

// Sample code templates
const SAMPLE_CODE = {
  'js-hello': 'console.log("Hello, World!");',
  'py-hello': 'print("Hello, World!")',
  'py-stdin': 'name = input("Enter your name: ")\nprint(f"Hello, {name}!")',
  'c-hello': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  'c-stdin': '#include <stdio.h>\n\nint main() {\n    char name[100];\n    printf("Enter your name: ");\n    scanf("%s", name);\n    printf("Hello, %s!\\n", name);\n    return 0;\n}',
  'cpp-hello': '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
};

// Load sample code
document.getElementById('sampleSelect').addEventListener('change', (e) => {
  const sample = e.target.value;
  if (sample && SAMPLE_CODE[sample]) {
    document.getElementById('code').value = SAMPLE_CODE[sample];
    // Auto-select appropriate language
    const langMap = {
      'js-hello': 'javascript',
      'py-hello': 'python',
      'py-stdin': 'python',
      'c-hello': 'c',
      'c-stdin': 'c',
      'cpp-hello': 'cpp'
    };
    document.getElementById('language-select').value = langMap[sample];
  }
});

// Copy code functionality
document.getElementById('btnCopy').addEventListener('click', async () => {
  const code = document.getElementById('code').value;
  if (code.trim()) {
    try {
      await navigator.clipboard.writeText(code);
      const btn = document.getElementById('btnCopy');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      const btn = document.getElementById('btnCopy');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  }
});

// Clear code functionality
document.getElementById('btnClear').addEventListener('click', () => {
  document.getElementById('code').value = '';
  document.getElementById('stdin').value = '';
  document.getElementById('output').textContent = '';
  document.getElementById('sampleSelect').value = '';
});

// Download code functionality
document.getElementById('btnDownload').addEventListener('click', () => {
  const code = document.getElementById('code').value;
  const language = document.getElementById('language-select').value;
  
  if (code.trim()) {
    const extensions = {
      'javascript': 'js',
      'python': 'py',
      'c': 'c',
      'cpp': 'cpp'
    };
    
    const extension = extensions[language] || 'txt';
    const filename = `code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});

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
      // Determine the correct API URL based on environment
      let apiUrl;
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Local development - use Express server
          apiUrl = 'http://localhost:5050/api/execute';
      } else {
          // Production - use Vercel serverless function
          apiUrl = '/api/execute';
      }
      
      console.log('Calling API at:', apiUrl); // Debug log
      const resp = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, stdin })
      });
      // Check if response is JSON
      const contentType = resp.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
      }
      
      const data = await resp.json();
      if (!resp.ok) {
          throw new Error(data?.error || `HTTP ${resp.status}: Execution failed`);
      }
      document.getElementById('output').textContent = data.output || data.status || 'No Output';
  } catch (err) {
      console.error('Error details:', err);
      if (err.message.includes('fetch')) {
          document.getElementById('output').textContent = 'Network error: Make sure your server is running on localhost:5050';
      } else {
          document.getElementById('output').textContent = err.message || 'Error running code';
      }
  }
});
// Remove matrix background
