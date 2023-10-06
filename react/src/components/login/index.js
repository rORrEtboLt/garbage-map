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
import { LoginValidator } from "./login_validator";
import "../../custom_css/micro_clear_fix.css";
import { AuthenticationCommunicator } from "../backend_communicator/authentication_communicator";
import { withAlert } from "react-alert";
import { saveToken } from "./login_functions";
import { withRouter } from "react-router-dom";

class Login extends PureComponent {
  state = {
    email: "",
    password: "",
    validation: LoginValidator.initialize(),
    isSubmitted: false,
  };

  authenticationCommunicator = new AuthenticationCommunicator();

  handleInputChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.validateLogin();
      }
    );
  };

  validateLogin = () => {
    this.setState({
      validation: LoginValidator.validate(this.state),
    });
  };

  isError = (field) => {
    if (this.state.validation[field].isInvalid && this.state.isSubmitted)
      return this.state.validation[field].message;
    else return false;
  };

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    this.validateLogin();

    if (this.state.validation.isValid) {
      const userInfo = {
        email: this.state.email,
        password: this.state.password,
      };
      this.authenticationCommunicator
        .authenticate(userInfo)
        .then((result) => {
          if (result.success) {
            // Function to handle login
            saveToken(result.data.token);
            // Route to default application
            this.props.history.push("/accounts");
          } else {
            this.props.alert.show(result.message);
          }
        })
        .catch((error) => {
          this.props.alert.show("Error Logging in.");
        });
    }
  };

  render() {
    return (
      <div>
        <Container style={{ paddingBottom: "5rem", paddingTop: "1rem" }} text>
          <Header as="h2">Login</Header>

          <Divider section />

          <Segment attached="top">
            <Form>
              <Form.Input
                error={this.isError("email")}
                fluid
                label="e-mail / username"
                name="email"
                placeholder="e-mail / username"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              <Form.Input
                error={this.isError("password")}
                fluid
                label="password"
                placeholder="password"
                name="password"
                type="password"
                onChange={this.handleInputChange}
                value={this.state.password}
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
            New here?&nbsp;Sign-up here&nbsp;instead.
          </Message>
        </Container>
      </div>
    );
  }
}

export default withRouter(withAlert()(Login));
