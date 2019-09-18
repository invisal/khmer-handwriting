import userService from './user.service';

describe('User Service', () => {
  test('Test save user', async (done) => {
    const data = {
      email: 'kevin@slash.co',
      username: 'kevin',
      password: 'kevin',
    };
    const result = await userService.save(data);

    expect(result.email).toEqual(data.email);
    expect(result.username).toEqual(data.username);
    expect(result.password).toEqual(data.password);
    done();
  });
});
