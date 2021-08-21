import React from "react";
import { connect } from "react-redux";
import { Header, Segment, Button, Form, Icon } from "semantic-ui-react";
import { handleSaveQuestionAnswer } from "../actions/users";

export class Question extends React.Component {
  state = {
    Answervalue: "",
  };

  handleChange = (e, { value }) => this.setState({ Answervalue: value });

  SubmitFunc = (event) => {
    event.preventDefault();
    if (this.state.Answervalue !== "") {
      const { LoggedUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(LoggedUser, question.id, this.state.Answervalue);
    }
  };

  render() {
    const { question } = this.props;
    let lockdisable = false;
    if (this.state.Answervalue === "") lockdisable = true;
    return (
      <Segment inverted>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.SubmitFunc} inverted>
          <Form.Group>
            <Form.Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.Answervalue === "optionOne"}
              onChange={this.handleChange}
            />
            <br />
            <Form.Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.Answervalue === "optionTwo"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field>
            <Button negative size="tiny" fluid positive disabled={lockdisable}>
              <Icon name="save"></Icon>
              Submit Answer
            </Button>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps({ LoggedUser }) {
  return {
    LoggedUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(Question);
