const signUpTemplate = data => {
  return (
    '<b>Doug Coffee - Validate Email </b><br/><p>Click on this link to Validate your email account.</p><br/><a href=" ' +
    data.url +
    "/validate-signup/" +
    data.verifySignupToken +
    '"> Validate Doug Coffee sign-up.</a>'
  );
};

module.exports = { signUpTemplate };
