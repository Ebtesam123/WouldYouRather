import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Header, Button, Segment } from "semantic-ui-react";

export default class PollAlternate extends Component {
  state = {
    pollStatus: false,
  };
  handleClick = (e) => {
    this.setState((pre) => ({
      pollStatus: !pre.pollStatus,
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const BtnText = unanswered === true ? "Give an Answer" : "View Results";

    if (this.state.pollStatus === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Segment color="red" style={{ backgroundColor: "pink" }}>
        <Header as="h4" textAlign="left">
          Would you rather
        </Header>
        <p className="Result">
          {question.optionOne.text} or {question.optionTwo.text}
        </p>
        <Button
          color="pink"
          size="tiny"
          fluid
          onClick={this.handleClick}
          content={BtnText}
        />
      </Segment>
    );
  }
}
