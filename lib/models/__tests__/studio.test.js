const Studio = require('../studio');

describe('is a studio', () => {
  it('valid model', () => {
    const data = {
      name: 'MGM',
      yearFounded: 1920,
      alive: true
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
      name: 1973,
      birthYear: 'Stephanie Meyer'
    };
    const studio = new Studio(data);

    const errors = studio.validateSync();
    expect(errors).toBeTruthy();
  });

});