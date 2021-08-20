import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Header, Grid, Image } from "semantic-ui-react";
import Question from "./Question";
import Result from "./Result";
import PollAlternate from "./PollAlternate";
import { pollTypes } from "../actions/actionTypes";

const PollContent = (props) => {
  const { Type, question, unanswered } = props;
  switch (Type) {
    case pollTypes.POLL_TEASER:
      return <PollAlternate question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <Question question={question} />;
    case pollTypes.POLL_RESULT:
      return <Result question={question} />;
    default:
      return;
  }
};

export class UsrCard extends React.Component {
  render() {
    const { author, question, pollType, bad, NotAnswerd = null } = this.props;

    if (bad === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <Segment.Group size="massive">
        <Header as="h5" textAlign="left" block attached="top">
          <Image src={author.avatarURL} avatar />
          {author.name}'s Question
        </Header>

        <Grid>
          <Grid.Column>
            <PollContent
              Type={pollType}
              question={question}
              unanswered={NotAnswerd}
            />
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UsrCard);
