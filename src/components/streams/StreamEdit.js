import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamFinalForm from './StreamFinalForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (
      !this.props.currentUserId ||
      this.props?.stream?.userId !== this.props.currentUserId
    )
      return <h3>Permission Denied</h3>;
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamFinalForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
