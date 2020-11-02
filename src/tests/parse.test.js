import { isDateInRange } from '../utils/parse';

it('date in range', () => {
  expect(
    isDateInRange(
      new Date('01/02/1976'),
      new Date(1976, 0, 1),
      new Date(1976, 0, 3)
    )
  ).toEqual(true);

  expect(
    isDateInRange(
      new Date('01/15/1976'),
      new Date(1976, 0, 10),
      new Date(1976, 1, 3)
    )
  ).toEqual(true);

  expect(
    isDateInRange(
      new Date('01/15/2002'),
      new Date(1976, 0, 10),
      new Date(1976, 1, 3)
    )
  ).toEqual(true);

  expect(
    isDateInRange(
      new Date('01/01/1976'),
      new Date(1976, 0, 10),
      new Date(1976, 1, 3)
    )
  ).toEqual(false);
});
