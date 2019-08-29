import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User entity', () => {
  let user: User;
  let testPass: string;

  beforeEach(() => {
    user = new User();
    user.password = 'password';
    user.salt = 'salt';
    testPass = 'testpass';
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      bcrypt.hash.mockReturnValue(user.password);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword(testPass);
      expect(bcrypt.hash).toHaveBeenCalledWith(testPass, user.salt);
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      bcrypt.hash.mockReturnValue('wronghash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword(testPass);
      expect(bcrypt.hash).toHaveBeenCalledWith(testPass, user.salt);
      expect(result).toEqual(false);
    });
  });
});
