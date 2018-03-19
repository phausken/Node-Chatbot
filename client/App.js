import React, { Component } from "react";
import styled from "styled-components";
import TextAreaContainer from "./TextAreaContainer";
import Title from "./Title";
import Input from "./Input";
import Button from "./Button";
import * as APIUtil from "./util";

const Wrapper = styled.section`
  margin: 40px 0;
  padding: 3em;
  width: 400px;
  font-family: "Pangram";



  @media (max-width: 850px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 1em;
    border-radius: 0;
  }
`;

const UserInputWrapper = styled.div`
  box-sizing: border-box;
  width: 400px;
  @media (max-width: 850px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      newUser: true,
      currentState: "initial",
      username: "",
      goal: "",
      content: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.transition = this.transition.bind(this);
    this.receiveContent = this.receiveContent.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.parseInput = this.parseInput.bind(this);
  }


  transition(option = "next") {
  //Simple "state management" for the app. Each state points to the next state
  //or multiple options.
    const uiStates = {
      initial: { next: "greeting" },
      greeting: {
        existing: "welcBack",
        new: "welcNewUser"
      },
      welcBack: { next: "confirmGoal" },
      welcNewUser: { next: "confirmGoal" },
      confirmGoal: {
        yes: "content",
        no: "retry"
      },
      retry: { next: "confirmGoal" }
    };
    const newState = uiStates[this.state.currentState][option];

    this.setState({
      currentState: newState,
      input: ``
    });
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }


  parseInput(inp){
  //parses user's responses to account for variations, capitalization
    const parsedInp = inp.toLowerCase();
    const y = "yes";
    const n = "no";
    const h = "hello";

    const inpOptions = {
      hello: h,
      hey: h,
      hi: h,
      hola: h,
      yes: y,
      yea: y,
      yeah: y,
      y,
      yep: y,
      no: n,
      nope: n,
      n,
      nah: n
    };

    return inpOptions[parsedInp];
  }

  receiveUser(input) {
    APIUtil.fetchUser(input).then(user => {
    //if no user is found in the database, fetchUser responds with null
      if (user) {
        this.setState({
          username: user.data.name,
          goal: user.data.goal,
          newUser: false
        });

        this.transition("existing");
      } else {
        this.setState({
          username: this.state.input
        });
        this.transition("new");
      }
    });
  }

  receiveContent() {
    return APIUtil.fetchContent(this.state.goal).then(res => {
      this.setState({
        content: res.data.content
      });
    });
  }

  newUser() {
    this.receiveContent().then(() => {
      return APIUtil.addUser(this.state.username, this.state.goal);
    });
  }

  updateGoal() {
    this.receiveContent().then(() => {
      return APIUtil.updateGoal(this.state.username, this.state.goal);
    });
  }

  confirmUser(newUser) {
    if (newUser) {
      this.newUser();
    } else {
      this.updateGoal();
    }
  }

  handleClick(event) {
    const currentState = this.state.currentState;
    const input = this.state.input;
    const newUser = this.state.newUser;

    if (currentState === "initial" && this.parseInput(input) === "hello") {
      this.transition();
    } else if (currentState === "greeting") {
      this.receiveUser(input);
    } else if (
      currentState === "welcNewUser" ||
      currentState === "welcBack" ||
      currentState === "retry"
    ) {
      this.setState({
        goal: input
      });
      this.transition();
    } else if (currentState === "confirmGoal") {
      if (this.parseInput(input) === "yes") {
        this.confirmUser(newUser);
        this.transition("yes");
      } else if (this.parseInput(input) === "no") {
        this.transition("no");
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Title>Shine Bot</Title>
        <TextAreaContainer
          username={this.state.username}
          goal={this.state.goal}
          content={this.state.content}
          currentState={this.state.currentState}
        />
        <UserInputWrapper>
          <Input
            onChange={this.handleInputChange}
            value={this.state.input}
            type="text"
            placeholder="User Response"
          />
          <Button onClick={this.handleClick}>Send</Button>
        </UserInputWrapper>
      </Wrapper>
    );
  }
}
