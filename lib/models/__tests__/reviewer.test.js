const Reviewer = require('../reviewer');

describe('is an reviewer', () => {
  it('valid model', () => {
    const data = {
      name: 'Dwane the Rock Johnson',
      company: 'School of Hard Knocks',
      yearsPub: 666,
      print: false
    };

    const reviewer = new Reviewer(data);

    const errors = reviewer.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewer.toJSON();
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
    const reviewer = new Reviewer(data);

    const errors = reviewer.validateSync();
    expect(errors).toBeTruthy();
  });

});