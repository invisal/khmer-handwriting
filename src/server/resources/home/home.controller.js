import email from '../../services/email.service';
import response from '../../services/helper/response.service';

export default {
  async index(req, res) {
    try {
      res.render('pages/index');
    } catch (error) {
      response.exception(res, error);
    }
  },
  async email(req, res) {
    try {
      const applicantOptions = {
        to: 'kevin@slash.co',
        subject: 'Vi har mottatt din søknad om Agricard Firma',
        template: 'template.html',
        model: {
        },
      };
      const emailResult = await email.send(applicantOptions);
      res.send(emailResult);
    } catch (error) {
      response.exception(res, error);
    }
  },
};
