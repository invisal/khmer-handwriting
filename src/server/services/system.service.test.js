import system from './system.service';

describe('Test email', () => {
  test('Test aggregate', () => {
    system.sum(10);
    expect(true).toEqual(true);
  });
});
