const nodeMailer = require("nodemailer");
const config = require("../../config");
const { SIGNUP_EMAIL } = require("../constants/send_e_mail_constants");
const { signUpTemplate } = require("../templates/signup_template");
const { logger } = require("../utilities/logger");
const { APP } = require("../constants/app_constants");

const sendSignUpMail = async (emailAddress, verifySignupToken) => {
  // Send successful sign up mail to the user
  let transporter = nodeMailer.createTransport(config.MAIL);
  // TODO Change it to a HTML Template into a new file.
  let mail = {
    from: SIGNUP_EMAIL.FROM, // TODO: Move to config and put production email
    to: emailAddress,
    subject: SIGNUP_EMAIL.SUBJECT,
    text: SIGNUP_EMAIL.HEAD,
    html: signUpTemplate({
      url: config.CLIENT.URL,
      verifySignupToken: verifySignupToken,
    }),
  };

  let mailInfo = await transporter.sendMail(mail).catch((err) => {
    // Add queues to handled not sent or error emails.
    logger.info(`${APP.EMAIL_SEND_ERROR}`);
  });
  return mailInfo;
};

module.exports = { sendSignUpMail };
