import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Icon,
  Menu,
  Image,
  Button,
  Container,
  Dropdown,
} from "semantic-ui-react";
import { setAuthUser } from "../actions/authUser";

class Navegation extends React.Component {
  Log_out = (e) => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;

    return (
      <Container>
        <Menu pointing color="pink" secondary>
          <Menu.Item name="Home Page" as={NavLink} to="/" exact>
            <Icon name="home" />
            Home Page
          </Menu.Item>
          <Menu.Item name="Add New Poll" as={NavLink} to="/add">
            <Icon name="question circle" />
            Add New Poll
          </Menu.Item>
          <Menu.Item name="View Leaderboard" as={NavLink} to="/leaderboard">
            <Icon name="trophy" />
            View Leaderboard
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              WELCOME,&nbsp;&nbsp;
              <Image src={users[authUser].avatarURL} avatar />
              <Dropdown item text={users[authUser].name}>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button
                      animated="vertical"
                      onClick={this.Log_out}
                      color="black"
                    >
                      <Button.Content hidden>Log out</Button.Content>
                      <Button.Content visible>
                        <Icon name="log out" />
                      </Button.Content>
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(Navegation);
