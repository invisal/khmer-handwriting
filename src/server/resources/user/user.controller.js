import assert from 'assert';
import response from '../../services/helper/response.service';
import userService from './user.service';

export default {
  async get(req, res) {
    try {
      assert(req.params.id, 'id is not valid');
      const result = await userService.get(req.params.id);
      response.success(res, result);
    } catch (error) {
      response.exception(res, error);
    }
  },
  async post(req, res) {
    try {
      const { value, error } = await userService.validateSaveUser(req.body);
      assert(!error, error);

      const result = await userService.save(value);
      response.success(res, result);
    } catch (error) {
      response.exception(res, error);
    }
  },
};
