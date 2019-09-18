import Slack from 'node-slack';

export default {
  send(stack) {
    const slack = new Slack(process.env.SLACK_URL, {});
    slack.send({
      text: stack.err,
      username: `${process.env.NODE_ENV}`,
      attachments: [{
        fallback: 'Error description',
        text: stack.stack,
        pretext: process.env.SLACK_PRETEXT || 'From EB Server*',
        color: 'bad',
        mrkdwn_in: ['pretext', 'text'],
      }],
      channel: '#eb-qbusiness-error-d',
      icon_emoji: 'tiger',
    });
  },
};
