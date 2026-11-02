const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Registered child processes
const runningProcesses = {
  pr4: null,
  pr6: null
};

// Helper: HTTP request with timeout
function checkHttpEndpoint(url, timeoutMs = 1500) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(url);
      const req = http.request({
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        timeout: timeoutMs
      }, (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 400,
            statusCode: res.statusCode,
            body: body
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, error: 'Request timed out' });
      });

      req.on('error', (err) => {
        resolve({ ok: false, error: err.code || err.message });
      });

      req.end();
    } catch (e) {
      resolve({ ok: false, error: e.message });
    }
  });
}

// Practical definition metadata
const PRACTICALS = [
  {
    id: 'pr1',
    number: 'Practical 01',
    numIndex: 1,
    title: 'Tasty Restaurant',
    subtitle: 'Restaurant Landing Page & Food Catalog',
    category: 'Frontend Web Development',
    tech: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox'],
    description: 'A beautifully designed culinary landing page showcasing an interactive hero showcase, special menu with pricing in INR (Pizza, Burger, Pasta, Sandwich, etc.), about our chefs story, and table reservation contact form.',
    type: 'static',
    folder: 'Pr1',
    entryPath: '/practicals/pr1/index.html',
    externalUrl: '/practicals/pr1/index.html',
    port: `${PORT} (Static)`,
    command: 'Served directly by Home Dashboard',
    requirements: {
      db: 'None required',
      env: 'None required',
      dependencies: 'None (Pure HTML/CSS)'
    }
  },
  {
    id: 'pr2',
    number: 'Practical 02',
    numIndex: 2,
    title: 'ShopEasy E-Commerce',
    subtitle: 'Electronics & Gadgets Product Catalog',
    category: 'Frontend Web Development',
    tech: ['HTML5', 'CSS3', 'CSS Grid', 'E-Commerce UI'],
    description: 'Comprehensive e-commerce storefront featuring summer sale promotion banners, category navigation, live search bar, and extensive electronics catalog (Gaming Laptops, Smartwatches, DSLR Cameras, Audio Gear, Monitors, 4K TVs).',
    type: 'static',
    folder: 'Pr2',
    entryPath: '/practicals/pr2/index.html',
    externalUrl: '/practicals/pr2/index.html',
    port: `${PORT} (Static)`,
    command: 'Served directly by Home Dashboard',
    requirements: {
      db: 'None required',
      env: 'None required',
      dependencies: 'None (Pure HTML/CSS)'
    }
  },
  {
    id: 'pr3',
    number: 'Practical 03',
    numIndex: 3,
    title: 'Personal Developer Portfolio',
    subtitle: 'Yash Dekate - Engineering Showcase',
    category: 'Frontend Web Development',
    tech: ['HTML5', 'CSS3', 'UI/UX Design', 'Portfolio'],
    description: 'Modern personal developer portfolio presenting personal biography, core competencies in AI, ML, Python, C++, and Web Development, academic education timeline, project showcase, and interactive inquiry form.',
    type: 'static',
    folder: 'Pr3',
    entryPath: '/practicals/pr3/index.html',
    externalUrl: '/practicals/pr3/index.html',
    port: `${PORT} (Static)`,
    command: 'Served directly by Home Dashboard',
    requirements: {
      db: 'None required',
      env: 'None required',
      dependencies: 'None (Pure HTML/CSS)'
    }
  },
  {
    id: 'pr4',
    number: 'Practical 04',
    numIndex: 4,
    title: 'Authentication & Profile System',
    subtitle: 'Full-Stack Flask + MySQL Web App',
    category: 'Full-Stack Web Development',
    tech: ['Python 3', 'Flask', 'MySQL', 'bcrypt', 'REST API'],
    description: 'Full-stack authentication system with animated double-sided sliding sign-in & sign-up forms, cryptographic bcrypt password hashing, MySQL database persistence, authenticated student profile dashboard (/profile), and JSON REST endpoints.',
    type: 'fullstack',
    folder: 'Pr4',
    entryPath: 'http://127.0.0.1:5000',
    externalUrl: 'http://127.0.0.1:5000',
    port: '5000 (Flask) | 3306 (MySQL)',
    command: 'cd Pr4 && python app.py',
    serviceKey: 'pr4',
    requirements: {
      db: 'MySQL (database: authentication_db, table: users)',
      env: 'DB_HOST=localhost, DB_PORT=3306, DB_USER=personal, DB_PASSWORD=MyNewPassword123!',
      dependencies: 'flask, flask-cors, mysql-connector-python, bcrypt'
    }
  },
  {
    id: 'pr5',
    number: 'Practical 05',
    numIndex: 5,
    title: 'The Daily Times News Portal',
    subtitle: 'Multi-Column Editorial Newspaper',
    category: 'Frontend Web Development',
    tech: ['HTML5', 'CSS3', 'Grid Layout', 'Editorial UI'],
    description: 'Digital broadsheet news portal with authentic newspaper design, live weather and date header, breaking news banner, and multi-column grid layout spanning World News, National Politics, Technology, Economy, Sports, and Science.',
    type: 'static',
    folder: 'Pr5',
    entryPath: '/practicals/pr5/index.html',
    externalUrl: '/practicals/pr5/index.html',
    port: `${PORT} (Static)`,
    command: 'Served directly by Home Dashboard',
    requirements: {
      db: 'None required',
      env: 'None required',
      dependencies: 'None (Pure HTML/CSS)'
    }
  },
  {
    id: 'pr6',
    number: 'Practical 06',
    numIndex: 6,
    title: 'Student Profile Portal',
    subtitle: 'React 19 SPA + Vite + Tailwind CSS',
    category: 'Modern Frontend Framework',
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'Lucide Icons', 'SPA'],
    description: 'State-of-the-art interactive student directory and academic profile portal featuring real-time search, department & GPA filters, Grid vs List layout switcher, student bookmarking, modal popups for academic courses and skills, and contact forms.',
    type: 'vite',
    folder: 'Pr 6/new-practical',
    entryPath: 'http://localhost:5173',
    externalUrl: 'http://localhost:5173',
    previewUrl: '/practicals/pr6-preview/index.html',
    port: '5173 (Vite Dev Server)',
    command: 'cd "Pr 6/new-practical" && npm run dev',
    serviceKey: 'pr6',
    requirements: {
      db: 'None required',
      env: 'Node.js 18+',
      dependencies: 'react, react-dom, lucide-react, vite, tailwindcss'
    }
  }
];

// Determine live status of practicals
async function getLiveStatuses() {
  const statuses = {};

  // Check Pr1, Pr2, Pr3, Pr5 (Static files)
  for (const p of PRACTICALS) {
    if (p.type === 'static') {
      const folderPath = path.join(ROOT_DIR, p.folder);
      const indexPath = path.join(folderPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        statuses[p.id] = {
          status: 'Ready',
          badgeClass: 'badge-ready',
          details: 'Static files verified and served live',
          isLive: true
        };
      } else {
        statuses[p.id] = {
          status: 'Setup Required',
          badgeClass: 'badge-setup',
          details: `index.html missing at ${folderPath}`,
          isLive: false
        };
      }
    }
  }

  // Check Pr4 (Flask + MySQL)
  const pr4Check = await checkHttpEndpoint('http://127.0.0.1:5000/api/test-db', 1200);
  if (pr4Check.ok) {
    let dbMsg = 'Database connected';
    try {
      const parsed = JSON.parse(pr4Check.body);
      if (parsed.database) dbMsg = `Connected to MySQL [${parsed.database}]`;
    } catch (e) {}
    statuses['pr4'] = {
      status: 'Ready',
      badgeClass: 'badge-ready',
      details: `Flask backend active on port 5000 • ${dbMsg}`,
      isLive: true,
      port: 5000
    };
  } else {
    // Check if port 5000 responds at all (even without DB)
    const pr4HomeCheck = await checkHttpEndpoint('http://127.0.0.1:5000/', 1000);
    if (pr4HomeCheck.ok || pr4HomeCheck.statusCode) {
      statuses['pr4'] = {
        status: 'Configuration Needed',
        badgeClass: 'badge-config',
        details: 'Flask server is running, but MySQL connection returned error',
        isLive: true,
        port: 5000
      };
    } else {
      statuses['pr4'] = {
        status: 'Not Running',
        badgeClass: 'badge-stopped',
        details: 'Flask server is offline. Click "Start Service" or run `python app.py` in Pr4',
        isLive: false,
        port: 5000
      };
    }
  }

  // Check Pr6 (Vite Dev Server) - check localhost first (handles IPv6 ::1 on Windows), fallback to 127.0.0.1
  let pr6Check = await checkHttpEndpoint('http://localhost:5173/', 1200);
  if (!pr6Check.ok) {
    pr6Check = await checkHttpEndpoint('http://127.0.0.1:5173/', 1200);
  }
  const pr6DistPath = path.join(ROOT_DIR, 'Pr 6', 'new-practical', 'dist', 'index.html');
  const hasDist = fs.existsSync(pr6DistPath);

  if (pr6Check.ok || (pr6Check.statusCode && pr6Check.statusCode < 500)) {
    statuses['pr6'] = {
      status: 'Ready',
      badgeClass: 'badge-ready',
      details: 'Vite development server active on port 5173 with HMR',
      isLive: true,
      port: 5173
    };
  } else if (hasDist) {
    statuses['pr6'] = {
      status: 'Ready (Preview)',
      badgeClass: 'badge-preview',
      details: 'Vite dev server offline, but production build is available to preview',
      isLive: false,
      hasPreview: true,
      port: 5173
    };
  } else {
    statuses['pr6'] = {
      status: 'Not Running',
      badgeClass: 'badge-stopped',
      details: 'Vite dev server is offline. Click "Start Service" or run `npm run dev` in Pr 6/new-practical',
      isLive: false,
      port: 5173
    };
  }

  return statuses;
}

// Serve static file
function serveStaticFile(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Add CORS headers for internal API calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const rawUrl = req.url || '/';
    const parsedUrl = new URL(rawUrl, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // 1. API: Get list of practicals
    if (pathname === '/api/practicals') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(PRACTICALS, null, 2));
      return;
    }

    // 2. API: Live health check status
    if (pathname === '/api/status') {
      const statuses = await getLiveStatuses();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(statuses, null, 2));
      return;
    }

    // 3. API: Start service (pr4 or pr6)
    if (pathname.startsWith('/api/service/') && pathname.endsWith('/start') && req.method === 'POST') {
      const serviceKey = pathname.split('/')[3];
      if (serviceKey === 'pr4') {
        if (!runningProcesses.pr4) {
          const pr4Dir = path.join(ROOT_DIR, 'Pr4');
          const proc = spawn('python', ['app.py'], {
            cwd: pr4Dir,
            shell: true,
            detached: false,
            stdio: 'ignore'
          });
          runningProcesses.pr4 = proc;
          proc.on('exit', () => { runningProcesses.pr4 = null; });
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Flask service start signal sent' }));
        return;
      }

      if (serviceKey === 'pr6') {
        if (!runningProcesses.pr6) {
          const pr6Dir = path.join(ROOT_DIR, 'Pr 6', 'new-practical');
          const proc = spawn('npm', ['run', 'dev'], {
            cwd: pr6Dir,
            shell: true,
            detached: false,
            stdio: 'ignore'
          });
          runningProcesses.pr6 = proc;
          proc.on('exit', () => { runningProcesses.pr6 = null; });
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Vite dev server start signal sent' }));
        return;
      }
    }

    // 4. API: Stop service (pr4 or pr6)
    if (pathname.startsWith('/api/service/') && pathname.endsWith('/stop') && req.method === 'POST') {
      const serviceKey = pathname.split('/')[3];
      if (serviceKey === 'pr4' && runningProcesses.pr4) {
        try {
          process.kill(runningProcesses.pr4.pid);
        } catch (e) {}
        runningProcesses.pr4 = null;
      }
      if (serviceKey === 'pr6' && runningProcesses.pr6) {
        try {
          process.kill(runningProcesses.pr6.pid);
        } catch (e) {}
        runningProcesses.pr6 = null;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Service stopped' }));
      return;
    }

    // 5. Route: Static practicals serving
    // /practicals/pr1/... -> ../Pr1/...
    // /practicals/pr2/... -> ../Pr2/...
    // /practicals/pr3/... -> ../Pr3/...
    // /practicals/pr5/... -> ../Pr5/...
    // /practicals/pr6-preview/... -> ../Pr 6/new-practical/dist/...
    if (pathname.startsWith('/practicals/')) {
      const subPath = pathname.replace('/practicals/', '');
      const parts = subPath.split('/');
      const practicalKey = parts[0];
      const remainder = parts.slice(1).join('/');

      // Directory redirection if trailing slash is missing
      if (parts.length === 1 && !pathname.endsWith('/')) {
        res.writeHead(301, { 'Location': pathname + '/' });
        res.end();
        return;
      }

      let targetDir = '';
      if (practicalKey === 'pr1') targetDir = path.join(ROOT_DIR, 'Pr1');
      else if (practicalKey === 'pr2') targetDir = path.join(ROOT_DIR, 'Pr2');
      else if (practicalKey === 'pr3') targetDir = path.join(ROOT_DIR, 'Pr3');
      else if (practicalKey === 'pr5') targetDir = path.join(ROOT_DIR, 'Pr5');
      else if (practicalKey === 'pr6-preview') targetDir = path.join(ROOT_DIR, 'Pr 6', 'new-practical', 'dist');

      if (targetDir) {
        let filePath = remainder ? path.join(targetDir, remainder) : path.join(targetDir, 'index.html');
        // If requesting a directory, append index.html
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }

        if (fs.existsSync(filePath)) {
          serveStaticFile(filePath, res);
          return;
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`File not found: ${remainder || 'index.html'}`);
          return;
        }
      }
    }

    // 6. Route: Serve Home Dashboard files (from ./public)
    const publicDir = path.join(__dirname, 'public');
    let requestedFile = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    let fullFilePath = path.join(publicDir, requestedFile);

    // Security check: prevent directory traversal
    if (!fullFilePath.startsWith(publicDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    if (fs.existsSync(fullFilePath) && fs.statSync(fullFilePath).isFile()) {
      serveStaticFile(fullFilePath, res);
      return;
    }

    // Fallback: index.html for SPA-like navigation if not found
    const indexFallback = path.join(publicDir, 'index.html');
    if (fs.existsSync(indexFallback)) {
      serveStaticFile(indexFallback, res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');

  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error: ' + error.message);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=====================================================`);
  console.log(` Web Development Practicals Dashboard Server`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Ready to route and monitor all 6 practicals!`);
  console.log(`=====================================================`);
});

// Process cleanup
process.on('SIGINT', () => {
  if (runningProcesses.pr4) try { process.kill(runningProcesses.pr4.pid); } catch (e) {}
  if (runningProcesses.pr6) try { process.kill(runningProcesses.pr6.pid); } catch (e) {}
  process.exit();
});
