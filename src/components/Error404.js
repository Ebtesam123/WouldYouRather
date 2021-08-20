import React from "react";
import { Segment } from "semantic-ui-react";

export class Error404 extends React.Component {
  render() {
    return (
      <Segment textAlign="center">
        <h3>This Not Match a correct Path (Error code 404)</h3>
        <p>Kindly Select a valid menu item.</p>
      </Segment>
    );
  }
}

export default Error404;
