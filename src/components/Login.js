import { connect } from "react-redux";
import React from "react";
import { Dimmer, Segment, Grid, Loader, Form } from "semantic-ui-react";
import { setAuthUser } from "../actions/authUser";

export default class LoginPage extends React.Component {
  state = {
    load: false,
  };
  SetLoad = () => {
    this.setState({ load: true });
  };

  render() {
    return (
      <div>
        <h2>This is Would You Rather Amazing Game! WELCOME</h2>
        <LoginFromLayout
          img={
            <img
              src="https://i.ytimg.com/vi/EEIGSui46sA/maxresdefault.jpg"
              width="100%"
              height="80%"
              alt="WouldYouRatherGame"
            />
          }
          load={this.state.load}
          form={<CombinedLogIn loading={this.SetLoad} />}
        />
      </div>
    );
  }
}

const LoginFromLayout = ({ img, form, load }) => (
  <div>
    <Grid padded>
      <Grid.Column>
        {load && (
          <Segment>
            <Dimmer active>
              <Loader size="huge">Loading</Loader>
            </Dimmer>
          </Segment>
        )}
        {img}
        <br />
        <br />
        {form}
      </Grid.Column>
    </Grid>
  </div>
);

class LoginForm extends React.Component {
  state = {
    value: "",
  };
  onChange = (event, { value }) => {
    this.setState({ value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { loading, setAuthUser } = this.props;
    const loggedUser = this.state.value;

    new Promise((response, rej) => {
      loading();
      //set time to show loading
      setTimeout(() => response(), 200);
    }).then(() => setAuthUser(loggedUser));
  };
  dropDownUserOptions = () => {
    const { users } = this.props;
    return users.map((u) => ({
      key: u.id,
      value: u.id,
      text: u.name,
      image: { src: u.avatarURL },
    }));
  };
  render() {
    const disableBtn = this.state.value === "" ? true : false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Select
          options={this.dropDownUserOptions()}
          placeholder="Choose to continue"
          required
          onChange={this.onChange}
          fluid
        />

        <Form.Button
          content="Log in"
          fluid
          color="violet"
          disabled={disableBtn}
        />
      </Form>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}
const CombinedLogIn = connect(mapStateToProps, { setAuthUser })(LoginForm);
