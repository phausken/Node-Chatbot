import React, { Component } from "react";
import TextArea from "./TextArea";

export default class TextAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.displayMessage = this.displayMessage.bind(this);
    this.currentTime = this.currentTime.bind(this);
  }

  displayMessage(currentState) {
    switch (currentState) {
      case "initial":
        return `Welcome! To get started, say hello!`;
      case "greeting":
        return `Good ${this.currentTime()}! What's your name?`;
      case "welcBack":
        return `Hi, ${
          this.props.username
        }! Welcome back! You said before you wanted to work on: "${
          this.props.goal
        }". What's one thing you want to work on now?`;
      case "welcNewUser":
        return `Hi, ${
          this.props.username
        }! What's one thing you want to work on?`;
      case "confirmGoal":
        return `So you want to work on "${
          this.props.goal
        }". Does that sound right, ${this.props.username}?`;
      case "retry":
        return `No problem, ${
          this.props.username
        }! Let's try again. What's one thing you want to work on?`;
      case "content":
        return `Great! Here's a daily dose of Shine to get you started: ${
          this.props.content
        }`;
      default:
        return ``;
    }
  }

  currentTime() {
    const d = new Date();
    const hours = d.getHours();

    if (hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours <= 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  render() {
    return <TextArea>{this.displayMessage(this.props.currentState)}</TextArea>;
  }
}
