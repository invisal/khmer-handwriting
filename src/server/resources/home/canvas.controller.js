import email from '../../services/email.service';
import response from '../../services/helper/response.service';

export default {
  async index(req, res) {
    try {
      res.render('pages/canvas');
    } catch (error) {
      response.exception(res, error);
    }
  }
};
