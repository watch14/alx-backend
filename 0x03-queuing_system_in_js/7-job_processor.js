import kue from 'kue';

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;
    job.progress(progress, 100);

    if (progress >= 50) {
      clearInterval(interval);
    }
  }, 1000);

  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

const queue = kue.createQueue({ concurrency: 2, redis: { port: 6379, host: '127.0.0.1' } });

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;

  sendNotification(phoneNumber, message, job, done);
});

queue.on('error', (err) => {
  console.error('Kue queue error:', err);
});

console.log('Job processor is running...');
