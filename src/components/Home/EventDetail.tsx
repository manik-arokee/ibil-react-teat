import "../../styles/home.css";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EventDetail = () => {
  const [event, setEvent] = useState([]);
  const { id } = useParams();

  function initiate() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const calendarID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
    gapi.client
      .init({
        apiKey,
      })

      .then(function () {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${id}`,
        });
      })

      .then(
        (response: any) => {
          console.log("item ", response.result);
          setEvent(...[response.result]);
          // return events;
        },
        function (err) {
          return [false, err];
        }
      );
  }

  gapi.load("client", initiate);

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} className="align-center">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <h4>Participants</h4>
            <ul>
              {event.attendees.map((participant) => {
                return <li>{participant.email}</li>;
              })}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;
