import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

function createHash() {
  client.hset(
    'HolbertonSchools',
    'Portland', '50',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle', '80',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York', '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota', '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali', '40',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris', '2',
    redis.print
  );
}

function displayHash() {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(reply);
    }
  });
}

client.on('connect', () => {
  console.log('Redis client connected to the server');

  createHash();
  displayHash();
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
