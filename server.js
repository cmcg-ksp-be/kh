const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const RSVP_FILE = path.join(__dirname, 'rsvps.json');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // API Route for GET RSVPs
    if (req.method === 'GET' && req.url === '/api/rsvp') {
        if (!fs.existsSync(RSVP_FILE)) {
            fs.writeFileSync(RSVP_FILE, '[]');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(fs.readFileSync(RSVP_FILE));
    }

    // API Route for POST RSVP
    if (req.method === 'POST' && req.url === '/api/rsvp') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const newRsvp = JSON.parse(body);
                let rsvps = [];
                if (fs.existsSync(RSVP_FILE)) {
                    rsvps = JSON.parse(fs.readFileSync(RSVP_FILE, 'utf8') || '[]');
                }
                rsvps.unshift(newRsvp); // Thêm lên đầu danh sách
                fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2));
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // Default: Serve Static Files (Trang HTML, CSS, JS)
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n================================`);
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`Dữ liệu RSVP sẽ được lưu tại: ${RSVP_FILE}`);
    console.log(`Nhấn Ctrl+C để tắt server.`);
    console.log(`================================\n`);
});
