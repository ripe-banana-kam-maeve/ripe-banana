const Film = require('../film');
const { ObjectId } = require('mongoose').Types;

describe('is a film', () => {
  it('valid model', () => {
    const data = {
      title: 'Alladin',
      director: 'Steve Jobs',
      yearPub: 1977,
      digital: false,
      actors: [new ObjectId()],
      studio: new ObjectId()
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

  it.skip('invalid model', () => {
   
  });

});