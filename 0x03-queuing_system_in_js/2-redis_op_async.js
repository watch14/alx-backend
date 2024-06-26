import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(err);
  }
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
