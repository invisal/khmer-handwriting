import assert from 'assert';
import response from '../../services/helper/response.service';
import mediaService from './media.service';

export default {
  async uploadPhoto(req, res) {
    try {
      req.body.referenceType = 'writings';
      const { value, error } = await mediaService.uploadPhoto(req);
      assert(!error, error);
      return response.success(res, value);
    } catch (error) {
      return response.exception(res, error);
    }
  },
};
