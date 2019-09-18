import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import User from './user.model';

export default {
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSaveUser(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }

    value.password = this.encryptPassword(value.password);

    return { value };
  },
  async get(id) {
    try {
      // save data
      const user = await User.findOne({ _id: id }).exec();
      return user;
    } catch (error) {
      throw error;
    }
  },
  async save(data) {
    try {
      // save data
      const user = await User(data).save();
      return user;
    } catch (error) {
      throw error;
    }
  },
};
