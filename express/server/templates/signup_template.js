const signUpTemplate = data => {
  return (
    '<b>Garbage Maps - Validate Email </b><br/><p>Click on this link to Validate your email account.</p><br/><a href=" ' +
    data.url +
    "/validate-signup/" +
    data.verifySignupToken +
    '"> Validate Garbage Maps sign-up.</a>'
  );
};

module.exports = { signUpTemplate };