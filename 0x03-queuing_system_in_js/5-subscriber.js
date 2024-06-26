import redis from 'redis';

const subscriber = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
  subscriber.subscribe('holberton school channel');
});

subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

subscriber.on('message', (channel, message) => {
  console.log(`Message received from channel ${channel}: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});

process.on('SIGINT', () => {
  subscriber.unsubscribe();
  subscriber.quit();
});
