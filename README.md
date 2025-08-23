# CodeZone - Advanced Online Compiler

A powerful online code editor and compiler supporting JavaScript, Python, C, and C++. Built with modern web technologies and powered by Judge0 API.

## ✨ Features

- **Multi-language Support**: JavaScript, Python, C, and C++
- **Real-time Code Execution**: Execute code instantly with Judge0 API
- **Input/Output Support**: Handle stdin/stdout for interactive programs
- **Sample Code Templates**: Pre-built examples for each language
- **Code Utilities**: Copy, clear, and download functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd codezone
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Start the development server**
   ```bash
   cd server && npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:5050`

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Deploy!

## 🏗️ Project Structure

```
codezone/
├── index.html          # Main application page
├── style.css           # Styling and animations
├── script.js           # Frontend functionality
├── api/                # Vercel serverless functions
│   └── execute/        # Code execution API
│       └── route.js    # API endpoint
├── server/             # Local development server
│   ├── index.js        # Express server
│   └── package.json    # Server dependencies
├── vercel.json         # Vercel configuration
└── package.json        # Project configuration
```

## 🔧 Configuration

### Environment Variables (Optional)

Set these in your Vercel dashboard for enhanced functionality:

- `JUDGE0_BASE_URL`: Custom Judge0 endpoint (defaults to free Judge0)
- `RAPIDAPI_KEY`: API key for RapidAPI Judge0 endpoint

### API Endpoints

- `POST /api/execute`: Execute code in any supported language
- `GET /health`: Health check endpoint

## 🌐 Supported Languages

| Language | Version | ID |
|----------|---------|----|
| JavaScript | Node.js | 63 |
| Python | 3.8.1 | 71 |
| C | GCC 9.2.0 | 50 |
| C++ | GCC 9.2.0 | 54 |

## 🎯 Usage

1. **Select Language**: Choose from the dropdown menu
2. **Write Code**: Use the code editor or load sample code
3. **Add Input**: Optionally provide stdin for interactive programs
4. **Execute**: Click "Run Code" to see the output
5. **Utilities**: Copy, clear, or download your code

## 🚀 Deployment Notes

- **Frontend**: Static files served by Vercel
- **Backend**: Serverless functions handle code execution
- **API**: Judge0 integration for secure code compilation
- **CORS**: Properly configured for cross-origin requests

## 🔒 Security

- Code execution is sandboxed via Judge0 API
- No server-side code storage
- Input validation and sanitization
- Rate limiting via Judge0

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

**Yash Gharge**
- LinkedIn: [Yash Gharge](https://www.linkedin.com/in/yash-gharge-063366278)

---

Made with ❤️ for the coding community
