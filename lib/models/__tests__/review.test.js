const Review = require('../review');
const { ObjectId } = require('mongoose').Types;



describe('is an review', () => {
  it('valid model', () => {
    const data = {
      rating: 4,
      reviewer: new ObjectId(),
      review: 'was bad',
      film: new ObjectId()
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
      name: [],
      review: {},
    };
    const review = new Review(data);

    const errors = review.validateSync();
    expect(errors).toBeTruthy();
  });

});