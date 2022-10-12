import "../../styles/home.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
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

const EventParticipant: React.FC<Props> = ({ event }) => {
  return (
    <TableRow>
      <TableCell>{event.eventType}</TableCell>
      <TableCell>{event.summary}</TableCell>
      <TableCell>
        {/* <Link to={generatePath(`${url}/:id`, { id: event.id })}>View</Link>
         */}
        <Link to={`/event/${event.id}`}>View</Link>
      </TableCell>
    </TableRow>
  );
};

export default EventParticipant;
