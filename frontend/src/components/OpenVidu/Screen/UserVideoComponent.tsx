import { Component } from 'react';
import OpenViduVideoComponent from '@components/OpenVidu/Screen/OvVideo';

interface UserVideoComponentProps {
  streamManager: any;
  className?: string;
}

export default class UserVideoComponent extends Component<UserVideoComponentProps> {
  getNameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div className={`relative ${this.props.className}`}>
        {this.props.streamManager !== undefined ? (
          <div>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <p className="absolute bottom-0 left-0 bg-black text-white p-1">{this.getNameTag()}</p>
          </div>
        ) : null}
      </div>
    );
  }
}
