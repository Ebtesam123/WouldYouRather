import React from "react";
import { Grid } from "semantic-ui-react";
import { GetData } from "../actions/DispatchQuestionsUsers";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Login";
import Navigation from "./Navigation";
import Home from "./Home";
import UsrCard from "./UsrCard";
import LeaderboardPanel from "./LeaderboardPanel";
import { Error404 } from "./Error404";
import AddPoll from "./AddPoll";

class App extends React.Component {
  componentDidMount() {
    this.props.GetData();
  }
  render() {
    const { LoggedUser } = this.props;
    return (
      <Router>
        <div>
          {LoggedUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <LoginPage />
                </ContentGrid>
              )}
            />
          ) : (
            <div>
              <Navigation />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/questions/:question_id"
                    component={UsrCard}
                  />
                  <Route exact path="/add" component={AddPoll} />
                  <Route
                    exact
                    path="/leaderboard"
                    component={LeaderboardPanel}
                  />
                  <Route component={Error404} />
                </Switch>
              </ContentGrid>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid centered>
    <Grid.Row />
    <Grid.Column width={8}>{children}</Grid.Column>
  </Grid>
);

function mapStateToProps({ LoggedUser }) {
  return {
    LoggedUser,
  };
}

export default connect(mapStateToProps, { GetData })(App); // mapStateToProps is the data that the compoenent needs
