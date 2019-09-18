import fs from 'fs';
import mailgunjs from 'mailgun-js';
import path from 'path';

export default {
  formatEmail(text, obj) {
    let result = text;
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        const val = obj[key];
        const reg = new RegExp(`@${key}`, 'g');
        result = result.replace(reg, val);
      }
    }
    return result;
  },
  async send(options) {
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const from = process.env.MAILGUN_FROM;
    const host = process.env.MAILGUN_HOST;
    const mailgun = mailgunjs({ apiKey, domain, host });
    const data = {
      from,
      to: options.to,
      subject: options.subject,
    };

    if (options.attachment) {
      data.attachment = options.attachment;
    }
    if (options.template) {
      // const html = await fs.readFileSync(`src/server/views/emails/${options.template}`, 'utf8');
      const html = await fs.readFileSync(path.resolve(__dirname, `../views/emails/${options.template}`), 'utf8');
      data.html = this.formatEmail(html, options.model);
    } else {
      data.text = options.text;
    }

    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, (error, body) => {
        if (error) {
          reject(error);
        }
        resolve({ error, body });
      });
    });
  },
};
