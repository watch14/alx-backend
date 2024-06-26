import kue from 'kue';
import chai from 'chai';
import createPushNotificationsJobs from './8-job.js';

const expect = chai.expect;

describe('createPushNotificationsJobs', function () {
  let queue;

  before(function () {
    queue = kue.createQueue({ redis: { host: '127.0.0.1', port: 6379 } });
    queue.testMode.enter();
  });

  after(function (done) {
    queue.testMode.clear(done);
    queue.testMode.exit();
  });

  it('display an error message if jobs is not an array', function () {
    const jobs = {};

    expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', function (done) {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' }
    ];

    createPushNotificationsJobs(jobs, queue);

    queue.testMode.jobs((err, jobs) => {
      if (err) return done(err);
      try {
        expect(jobs.length).to.equal(2);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
