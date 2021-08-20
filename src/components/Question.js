import React from "react";
import { connect } from "react-redux";
import { Header, Segment, Button, Form, Icon } from "semantic-ui-react";
import { handleSaveQuestionAnswer } from "../actions/users";

export class Question extends React.Component {
  state = {
    value: "",
  };

  handleChange = (e, { value }) => this.setState({ value });

  SubmitFunc = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    let lockdisable = false;
    if (this.state.value === "") lockdisable = true;
    return (
      <Segment inverted>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.SubmitFunc} inverted>
          <Form.Group>
            <Form.Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === "optionOne"}
              onChange={this.handleChange}
            />
            <br />
            <Form.Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === "optionTwo"}
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

function mapStateToProps({ authUser }, { match }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(Question);
