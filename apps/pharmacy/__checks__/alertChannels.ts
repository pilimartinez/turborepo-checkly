import { EmailAlertChannel } from 'checkly/constructs'

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
}

export const emailAlert = new EmailAlertChannel('email-pharmacy', {
  address: 'pilar@checklyhq.com',
  ...sendDefaults,
})
