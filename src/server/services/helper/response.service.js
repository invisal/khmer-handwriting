import slack from './slack.service';

export default {
  success(res, message, code, options) {
    if (res.headerSent) return;
    if (typeof code === 'object') {
      options = code;
      code = 200;
    }
    res.status(parseInt(code, 10) || 200).json({
      status: 'success',
      result: message,
      code: code || 200,
      options,
    });
  },
  error(res, message, code, options) {
    if (res.headerSent) return;
    res.status(parseInt(code, 10) || 400).json({
      status: 'error',
      result: message,
      code: code || 400,
      options,
    });
  },
  exception(res, exception, code, options) {
    const logicError = exception.name === 'AssertionError [ERR_ASSERTION]';
    const messageObject = typeof exception.message === 'object' ? exception.message : {
      text: exception.message,
      status: code || 500,
    };
    let displayMessage = '';
    // internal server error
    if (!logicError) {
      displayMessage = (options && options.defaultText) || 'Sorry, there was an internal server error';
      if (process.env.NODE_ENV === 'production') {
        // send email to support team
      }
      // the error from assert
    } else {
      messageObject.status = 401;
      displayMessage = messageObject.text || exception.message || options.defaultText || 'Sorry, there was an internal server error';
    }
    const isDebug = process.env.NODE_ENV === 'development';
    // logger.info(isDebug)
    const stack = {
      err: messageObject.text || exception.message,
      stack: exception.stack || exception,
      options,
    };
    if (isDebug) {
      // send slack channel
      slack.send(stack);
      // send email to support team
    }

    console.log(stack);
    if (res.headerSent) return;

    const statusCode = parseInt(messageObject.status, 10) || parseInt(code, 10) || 500;
    try {
      res.status(statusCode).json({
        status: 'error',
        result: displayMessage,
        code,
        options: isDebug ? stack : null,
      });
    } catch (e) {
      console.log('error from response', e);
    }
  },
};
