const Studio = require('../studio');

describe('is a studio', () => {
  it('valid model', () => {
    const data = {
      name: 'MGM',
      address: {
        city: 'beaverton',
        state: 'OR',
        country: 'USA'
      }
    };

    const studio = new Studio(data);

    const errors = studio.validateSync();
    expect(errors).toBeUndefined();

    const json = studio.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('invalid model', () => {
    const data = {
      name: {},
      address: []
    };
    const studio = new Studio(data);

    const errors = studio.validateSync();
    expect(errors).toBeTruthy();
  });

});