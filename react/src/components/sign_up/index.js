import React, { PureComponent } from "react";
import {
  Form,
  Container,
  Divider,
  Header,
  Segment,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";
import { SignUpValidator } from "./sign_up_validator";
import "../../custom_css/micro_clear_fix.css";
import { AuthenticationCommunicator } from "../backend_communicator/authentication_communicator";
import { withAlert } from "react-alert";

class SignUp extends PureComponent {
  state = {
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
    validation: SignUpValidator.initialize(),
    isSubmitted: false,
  };

  authenticationCommunicator = new AuthenticationCommunicator();

  handleInputChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.validateSignUp();
      }
    );
  };

  validateSignUp = () => {
    this.setState({
      validation: SignUpValidator.validate(this.state),
    });
  };

  isError = (field) => {
    if (this.state.validation[field].isInvalid && this.state.isSubmitted)
      return this.state.validation[field].message;
    else return false;
  };

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    this.validateSignUp();

    if (this.state.validation.isValid) {
      const userInfo = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        passwordAgain: this.state.passwordAgain,
      };
      this.authenticationCommunicator
        .create(userInfo)
        .then((result) => {
          if (result.success) {
            this.props.alert.show(result.message);
          }
          else{
            this.props.alert.show(result.message);
          }
        })
        .catch((error) => {
          this.props.alert.show("Error creating sign-up details.");
        });
    }
  };

  render() {
    return (
      <div>
        <Container style={{ paddingBottom: "5rem", paddingTop: "1rem" }} text>
          <Header as="h2">Sign-up</Header>

          <Divider section />

          <Segment attached="top">
            <Form>
              <Form.Input
                error={this.isError("email")}
                fluid
                label="e-mail"
                name="email"
                placeholder="abc@xyz.com"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              <Form.Input
                error={this.isError("username")}
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
              <Form.Input
                error={this.isError("password")}
                fluid
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              <Form.Input
                error={this.isError("passwordAgain")}
                fluid
                label="Password"
                type="password"
                placeholder="Password"
                name="passwordAgain"
                onChange={this.handleInputChange}
                value={this.state.passwordAgain}
              />
            </Form>
            <div className="cf">
              {" "}
              <Button
                primary
                disabled={this.state.validation.isInvalid}
                type="submit"
                floated="right"
                style={{ marginTop: "2rem" }}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Segment>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Already signed up?&nbsp;Login here&nbsp;instead.
          </Message>
        </Container>
      </div>
    );
  }
}

export default withAlert()(SignUp);
