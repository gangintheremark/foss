import React, { Component } from 'react';
import OpenViduVideoComponent from '@components/OpenVidu/Screen/OrVideo';

interface UserVideoComponentProps {
  streamManager: any;
}

export default class UserVideoComponent extends Component<UserVideoComponentProps> {
  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
