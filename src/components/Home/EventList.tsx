import "../../styles/home.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import List from "@mui/material/List";
import EventItem from "./EventItem";

interface EventData {
  id: string;
  eventType: string;
  summary: string;
}

const EventList = () => {
  const [events, setEvents] = useState([]);
  function initiate() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const calendarID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
    gapi.client
      .init({
        apiKey,
      })

      .then(function () {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        });
      })

      .then(
        (response: any) => {
          console.log("items ", response.result.items);
          setEvents(...[response.result.items]);
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
      <h2>Events</h2>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}>
        {events.map((event) => {
          return <EventItem event={event} />;
        })}
      </List>
    </div>
  );
};

export default EventList;
