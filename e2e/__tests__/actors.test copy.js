const request = require('../request');
const db = require('../db');


describe.skip('actors api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('actors')
    ]);
  });
  const john = {
    name: 'John Travolta',
    birthYear: 1953
  };

  function postActor() {
    return request 
      .post('/api/actors')
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an actor', () => {
    return postActor(john).then(actor => {
      expect(actor).toMatchInLineSnapshot(
        {
          _id: expect.any(String)
        },
      );
    });
  });
});