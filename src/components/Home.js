import React from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import UsrCard from "./UsrCard";

export class HomePage extends React.Component {
  render() {
    const { Usr_Que } = this.props;
    const color = "purple";
    return (
      <Tab
        menu={{ color, attached: false, pointing: true }}
        panes={panes({ Usr_Que })}
      />
    );
  }
}

const panes = (p) => {
  const { Usr_Que } = p;
  return [
    {
      menuItem: "Questions need to be answerd",
      render: () => (
        <Tab.Pane attached={false}>
          {Usr_Que.answered.map((question) => (
            <UsrCard
              key={question.id}
              NotAnswerd={true}
              question_id={question.id}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Questions",
      render: () => (
        <Tab.Pane>
          {Usr_Que.unanswered.map((question) => (
            <UsrCard
              key={question.id}
              NotAnswerd={false}
              question_id={question.id}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

function mapStateToProps({ authUser, users, questions }) {
  const Ans_Ids = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !Ans_Ids.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => Ans_Ids.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    Usr_Que: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(HomePage);
