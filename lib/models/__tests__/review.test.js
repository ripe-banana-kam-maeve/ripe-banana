const Review = require('../review');

describe('is an review', () => {
  it('valid model', () => {
    const data = {
      name: 4,
      reviewer: expect.any(Object),
      review: 'was bad',
      film: expect.any(Object)
    };

    const review = new Review(data);

    const errors = review.validateSync();
    expect(errors).toBeUndefined();

    const json = review.toJSON();
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
    const review = new Review(data);

    const errors = review.validateSync();
    expect(errors).toBeTruthy();
  });

});