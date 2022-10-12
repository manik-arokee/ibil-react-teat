import "../../styles/home.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { Link, generatePath, useRouteMatch } from "react-router-dom";

interface EventData {
  id: string;
  eventType: string;
  summary: string;
}
interface Props {
  event: EventData;
}
// const { url } = useRouteMatch();

const EventItem: React.FC<Props> = ({ event }) => {
  return (
    <ListItem component={Link} to={`/event/${event.id}`}>
      <ListItemButton>
        <ListItemText
          primary={event.summary}
          secondary={event.start.dateTime}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default EventItem;
