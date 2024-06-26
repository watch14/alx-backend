import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

process.on('SIGINT', () => {
  client.quit();
});

client.ping((err, reply) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`Redis server replied: ${reply}`);
  }
});
