import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Grid, Image } from "semantic-ui-react";
import Question from "./Question";
import Result from "./Result";
import PollAlternate from "./PollAlternate";
import { PollContentType } from "../actions/actionTypes";

const PollContent = (props) => {
  const { ContentType, InvolvedQue, unanswered } = props;
  switch (ContentType) {
    case PollContentType.ALTERNATE:
      return <PollAlternate question={InvolvedQue} unanswered={unanswered} />;
    case PollContentType.QUESTION:
      return <Question question={InvolvedQue} />;
    case PollContentType.RESULT:
      return <Result question={InvolvedQue} />;
    default:
      return;
  }
};

export class UsrCard extends React.Component {
  render() {
    const { author, Que, PType, NotAnswerd = null } = this.props;

    return (
      <Segment.Group size="massive">
        <Header as="h5" textAlign="left" block attached="top">
          <Image src={author.avatarURL} avatar />
          {author.name}'s Question
        </Header>

        <Grid>
          <Grid.Column>
            <PollContent
              ContentType={PType}
              InvolvedQue={Que}
              unanswered={NotAnswerd}
            />
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, LoggedUser },
  { question_id, match }
) {
  let Qid, PType;
  if (question_id !== undefined) {
    Qid = question_id;
    PType = PollContentType.ALTERNATE;
  } else {
    Qid = match.params.question_id;

    //console.log("CASEEEEE", Qid);
    PType = PollContentType.QUESTION;

    if (Object.keys(users[LoggedUser].answers).includes(Qid)) {
      PType = PollContentType.RESULT;
    }
  }
  const Que = questions[Qid];
  const author = users[Que.author];
  return {
    Que,
    author,
    PType,
  };
}

export default connect(mapStateToProps)(UsrCard);
//mapStateToProps data that UsrCard Needs, passed to it as props
