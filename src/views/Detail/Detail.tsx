import React from "react";
import "../../styles/home.css";
import { useQuery } from "react-query";
import { gapi, loadAuth2 } from "gapi-script";
import { Redirect } from "react-router-dom";
import { Header } from "../../components";
import EventDetail from "../../components/Home/EventDetail";

const Detail = () => {
  //  const { data, isFetching } = useQuery(["GET", "/character", {}]);

  // if (isFetching) return <p>Is loading...</p>;

  // if (error) return <p>${error}</p>;

  // console.log(data);
  if (!gapi.auth2 || !gapi.auth2.getAuthInstance())
    return <Redirect to="/login" />;

  return (
    <div className="App">
      <Header />
      <EventDetail />
    </div>
  );
};

export default Detail;
