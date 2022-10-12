import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { defaultQueryFn } from "../api/request";
import theme from "../assets/theme";
import { NotFound } from "../views";
import { Login, EventDetail } from "../components";

const Home = lazy(() => import("../views/Home/Home"));
const Detail = lazy(() => import("../views/Detail/Detail"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const IndexRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                component={Home}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/login`}
                component={Login}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/event/:id`}
                component={Detail}
              />

              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default IndexRouter;
