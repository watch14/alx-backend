import kue from 'kue';

const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;

  sendNotification(phoneNumber, message);

  setTimeout(() => {
    done();
  }, 1000);
});

queue.on('error', (err) => {
  console.error('Queue error:', err);
});

console.log('Waiting for jobs...');
