import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Form,
  Loader,
  Grid,
  Divider,
  Icon,
} from "semantic-ui-react";
import { handleSaveQuestion } from "../actions/questions";

export class AddPoll extends React.Component {
  state = {
    validSubmit: false,
    isLoading: false,
    option1: "",
    option2: "",
  };
  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  SubmitQue = (event) => {
    event.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, r) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res("success"), 400);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    const lockSubmit = this.state.option1 === "" || this.state.option2 === "";

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Segment inverted>
        <Header
          as="h3"
          textAlign="center"
          image="https://cdn.dribbble.com/users/2894696/screenshots/15460873/media/3c0cd2e9760839120f069e88a6868e24.jpg?compress=1&resize=400x300"
          content="Create a New Poll"
          inverted
        />
        <br />
        <Grid.Column>
          {this.state.isLoading && <Loader active size="big" />}
          <Divider horizontal>
            <Header as="h5" inverted>
              <Icon name="selected radio" />
              Complete Question options
            </Header>
          </Divider>
          <p>
            <b>Would you rather:</b>
          </p>
          <Form onSubmit={this.SubmitQue}>
            <Form.Input
              id="option1"
              placeholder="Type First Option Here"
              value={this.state.option1}
              required
              onChange={this.onChange}
            />
            <Form.Input
              id="option2"
              placeholder="Type Second Option Here"
              value={this.state.option2}
              required
              onChange={this.onChange}
            />
            <Form.Button
              inverted
              fluid
              color="yellow"
              size="tiny"
              basic
              disabled={lockSubmit}
            >
              Add a New Poll
            </Form.Button>
          </Form>
        </Grid.Column>
      </Segment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(AddPoll);
