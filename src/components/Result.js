import { withRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Button, Header, Label, Segment, Progress } from "semantic-ui-react";

const YourVoteLabel = () => (
  <div style={{ float: "right" }}>
    <Label basic color="red" pointing="left">
      Voted by You
    </Label>
  </div>
);

export class Result extends React.Component {
  onClick = () => {
    this.props.history.push("/");
  };
  resultContent(questionText, optionVotes, TotalVotes, UsrChoice) {
    const progress = ((optionVotes / TotalVotes) * 100).toFixed(1);
    return (
      <Segment color="red" style={{ backgroundColor: "pink" }}>
        {UsrChoice && <YourVoteLabel />}
        <p className="Result">{questionText}</p>
        <Progress percent={progress} color="black" progress />
        <p className="tiny">
          {optionVotes} of totol {TotalVotes} votes{" "}
        </p>
      </Segment>
    );
  }

  render() {
    const { question, user } = this.props;
    const FirstOptionVotes = question.optionOne.votes.length;
    const SecondOptionVotes = question.optionTwo.votes.length;
    const VotesTotal = FirstOptionVotes + SecondOptionVotes;
    const Usr_Vote = user.answers[question.id];

    return (
      <Segment inverted>
        <Header as="h5">Results of Would You Rather:</Header>
        {this.resultContent(
          question.optionOne.text,
          FirstOptionVotes,
          VotesTotal,
          Usr_Vote === "optionOne"
        )}
        {this.resultContent(
          question.optionTwo.text,
          SecondOptionVotes,
          VotesTotal,
          Usr_Vote === "optionTwo"
        )}
        {/* <Form.Field> */}
        <Button
          floated="right"
          icon="left chevron"
          content="Back"
          color="black"
          onClick={this.onClick}
        />
        <br />
      </Segment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Result));
