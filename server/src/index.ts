import app from './app';
import http from 'http';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Signal is SIGINT');
  server.close(() => {
      process.exit(0);
  })
});

process.on('SIGTERM', () => {
   console.log('Signal is SIGTERM');
   server.close(() => {
       process.exit(0);
   })
});

process.on('SIGUSR2', () => {
   console.log('Signal is SIGUSR2');
   server.close(() => {
       process.exit(1);
   })
});