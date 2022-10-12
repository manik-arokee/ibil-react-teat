import React from "react";
import "../../styles/home.css";
import { useQuery } from "react-query";
import { gapi, loadAuth2 } from "gapi-script";
import { Redirect } from "react-router-dom";
import { Header } from "../../components";
import EventList from "../../components/Home/EventList";

const Home = () => {
  //  const { data, isFetching } = useQuery(["GET", "/character", {}]);

  // if (isFetching) return <p>Is loading...</p>;

  // if (error) return <p>${error}</p>;
  // const clientId=process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const auth2 = await loadAuth2(gapi, clientId, "");

  // console.log(data);
  if (!gapi.auth2 || !gapi.auth2.getAuthInstance())
    return <Redirect to="/login" />;

  return (
    <div className="App">
      <Header />
      <EventList />
    </div>
  );
};

export default Home;
