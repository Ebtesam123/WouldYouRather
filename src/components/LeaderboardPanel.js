import React from "react";
import { connect } from "react-redux";
import { Segment, Grid, Header, Image, Label } from "semantic-ui-react";

const Places = ["1", "2", "3"];

export class LeaderboardPanel extends React.Component {
  render() {
    const { Data_leaderboard } = this.props;

    return (
      <Segment>
        {Data_leaderboard.map((Usr, place) => (
          <Segment key={Usr.Usr_Id} color="pink">
            <Label
              ribbon
              icon="trophy"
              content={Places[place]}
              color="violet"
            />
            <Grid divided>
              <Grid.Row>
                <Grid.Column width={3} verticalAlign="middle">
                  <Image circular src={Usr.Usr_avatar} />
                  <Header as="h4" textAlign="center">
                    {Usr.Usr_name}
                  </Header>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Grid>
                    <Grid.Column width={14}>
                      The number of questions the user asked
                    </Grid.Column>
                    <Grid.Column width={2}>{Usr.NoOfAnswers}</Grid.Column>
                  </Grid>
                  <Grid>
                    <Grid.Column width={14}>
                      The number of questions the user answered
                    </Grid.Column>
                    <Grid.Column width={2}>{Usr.NoOfAnsQue}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3} textAlign="center">
                  <strong> Total </strong>
                  <br />
                  <br />
                  <Label size="big" color="pink" tag>
                    {Usr.NoOfAnsQue + Usr.NoOfAnswers}
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))}
      </Segment>
    );
  }
}

function mapStateToProps({ users }) {
  const Data_leaderboard = Object.values(users)
    .map((USR) => ({
      Usr_Id: USR.id,
      Usr_name: USR.name,
      Usr_avatar: USR.avatarURL,
      NoOfAnswers: Object.values(USR.answers).length,
      NoOfAnsQue: USR.questions.length,
      SumOfVotes: Object.values(USR.answers).length + USR.questions.length,
    }))
    .sort((x, y) => x.SumOfVotes - y.SumOfVotes)
    .reverse()
    .slice(0, 3);
  return {
    Data_leaderboard,
  };
}

export default connect(mapStateToProps)(LeaderboardPanel);
