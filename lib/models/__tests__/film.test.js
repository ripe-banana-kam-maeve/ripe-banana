const Film = require('../film');
const { ObjectId } = require('mongoose').Types;

describe('is a film', () => {
  it('valid model', () => {
    const data = {
      title: 'Alladin',
      studio: new ObjectId(),
      released: 1977,
      cast: [new ObjectId()]
    };

    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON();

    expect(json).toEqual({
      ...data,
      actors: [
        expect.any(Object)
      ],
      _id: expect.any(Object)
    });
  });

  it('invalid model', () => {
    const data = {
      title: true,
      studio: 325,
      released: 'emma',
      cast: ['slkfj']
    };
    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeTruthy();
  });
});