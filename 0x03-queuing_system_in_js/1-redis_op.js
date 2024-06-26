import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(reply);
  });
}

client.on('connect', () => {
  console.log('Redis client connected to the server');

  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
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
