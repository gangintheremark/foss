import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { OpenVidu } from 'openvidu-node-client';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: process.env.CONFIG });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Environment variables
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const OPENVIDU_URL = process.env.OPENVIDU_URL || 'http://localhost:4443';
const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET || 'ssafyteam5';

// Enable CORS support
app.use(cors());

const server = http.createServer(app);
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Allow application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Allow application/json
app.use(bodyParser.json());

// Serve static resources if available
app.use(express.static(path.join(__dirname, 'public')));

// Serve application
server.listen(SERVER_PORT, () => {
  console.log('Application started on port: ', SERVER_PORT);
  console.warn('Application server connecting to OpenVidu at ' + OPENVIDU_URL);
});

// API endpoints
app.post('/api/sessions', async (req, res) => {
  console.log('asdasdasd');
  try {
    const session = await openvidu.createSession(req.body);
    res.send(session.sessionId);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).send('Error creating session');
  }
});

app.post('/api/sessions/:sessionId/connections', async (req, res) => {
  try {
    console.log('asdasdasdasdasdasd');
    const session = openvidu.activeSessions.find((s) => s.sessionId === req.params.sessionId);
    if (!session) {
      res.status(404).send('Session not found');
    } else {
      const connection = await session.createConnection(req.body);
      res.send(connection.token);
    }
  } catch (error) {
    console.error('Error creating connection:', error);
    res.status(500).send('Error creating connection');
  }
});

process.on('uncaughtException', (err) => console.error(err));
