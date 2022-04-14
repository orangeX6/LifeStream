import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    // if (!this.props.stream)
    //   return `Are you sure you want to delete this stream?`;

    // return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;

    return !this?.props?.stream
      ? `Are you sure you want to delete this stream?`
      : `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
  }

  render() {
    if (
      !this.props.currentUserId ||
      this.props?.stream?.userId !== this.props.currentUserId
    )
      return (
        <Modal
          title="Permission Denied"
          content="Invalid User"
          onDismiss={() => history.push('/')}
        />
      );
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
