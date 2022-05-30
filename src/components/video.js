import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import "../css/videoAll.css"

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container className="video_div">
      <Grid item xs={gridSpacing}>
        {!tracks ? (<AgoraVideoPlayer
          videoTrack={tracks[1]}
          className="me"
        />) : (<h1 className="loader"></h1>)}
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                {users ? (<AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  className="other"
                />):(<h1 className="loader"></h1>)}
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}