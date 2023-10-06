import React, { Component } from 'react';
import { Message } from 'semantic-ui-react'

class AlertTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      message: props.message,
      type: props.options.type,
      dismiss: props.options.timeout,
      style: props.style
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return this.state.type === 'error' ? (
      <Message
        color="danger"
        style={this.state.style}
        isOpen={this.state.visible}
        toggle={this.onDismiss}
      >
        {this.state.message}
      </Message>
    ) : (
      <Message
        color={this.state.type}
        style={this.state.style}
        isOpen={this.state.visible}
        toggle={this.onDismiss}
      >
        {this.state.message}
      </Message>
    );
  }
}

export default AlertTemplate;
