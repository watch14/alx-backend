import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification message!'
};

const job = queue.create('push_notification_code', jobData);

job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
  console.log('Notification job completed');
  queue.shutdown(5000, (err) => {
    console.log('Kue shutdown: ', err || 'OK');
    process.exit(0);
  });
});

job.on('failed', () => {
  console.log('Notification job failed');
  queue.shutdown(5000, (err) => {
    console.log('Kue shutdown: ', err || 'OK');
    process.exit(1);
  });
});

job.save((err) => {
  if (err) {
    console.error('Error creating job:', err);
    process.exit(1);
  }
});
