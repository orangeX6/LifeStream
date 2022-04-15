import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const id = props.match.params.id;
  const stream = useSelector((state) => state.streams[id]);
  const dispatch = useDispatch();
  const videoRef = useRef();
  const player = useRef();
  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  useEffect(() => {
    const buildPlayer = () => {
      if (!stream) {
        return;
      }
      player.current = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`,
      });
      player.current.attachMediaElement(videoRef.current);
      player.current.load();
    };
    buildPlayer();
    return () => {
      if (player.current) {
        player.current.destroy();
      }
    };
  }, [stream, id]);
  if (!stream) {
    return <div>Loading...</div>;
  }
  const { title, description } = stream;
  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls={true} />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default StreamShow;
