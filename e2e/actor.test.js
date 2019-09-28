const Actor = require('../lib/models/actor');

describe('is an actor', () => {
  it('valid model', () => {
    const data = {
      name: 'Jhonny Depp',
      dob: 'March 23rd 1957',
      pob: 'Pittsburg, PA'
    };

    const actor = new Actor(data);

    const errors = actor.validateSync();
    expect(errors).toBeUndefined();

    const json = actor.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('invalid model', () => {
    const data = {
      name: 1973,
      birthYear: 'Stephanie Meyer'
    };
    const actor = new Actor(data);

    const errors = actor.validateSync();
    expect(errors).toBeTruthy();
  });

});