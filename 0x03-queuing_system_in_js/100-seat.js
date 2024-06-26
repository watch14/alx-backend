import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const redisClient = redis.createClient();

const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

const initialAvailableSeats = 50;
let reservationEnabled = true;

const reserveSeat = async (number) => {
  await setAsync('available_seats', number.toString());
};

const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats) : 0;
};

const queue = kue.createQueue();

const app = express();
const PORT = 1245;

app.use(express.json());

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat');

  job.on('enqueue', () => {
    console.log(`Seat reservation job ${job.id} enqueued`);
    res.json({ status: 'Reservation in process' });
  });

  job.save((err) => {
    if (err) {
      console.error('Error saving job:', err);
      return res.json({ status: 'Reservation failed' });
    }
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    try {
      let currentSeats = await getCurrentAvailableSeats();
      if (currentSeats === 0) {
        reservationEnabled = false;
        return done(new Error('Not enough seats available'));
      }

      currentSeats--;
      await reserveSeat(currentSeats);

      if (currentSeats === 0) {
        reservationEnabled = false;
      }

      console.log(`Seat reservation job ${job.id} completed`);
      done();
    } catch (error) {
      console.error(`Seat reservation job ${job.id} failed: ${error.message}`);
      done(error);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
