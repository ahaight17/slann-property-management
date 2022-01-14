import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import SiteHeader from "containers/SiteHeader";
import AllListings from "containers/AllListings/AllListings";
import PageAddListing from "containers/PageAddListing/PageAddListing2";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import { withAuthenticationRequired } from '@auth0/auth0-react';

export const pages: Page[] = [
  { path: "/", exact: true, component: AllListings },
  { path: "/add-listing", component: PageAddListing },
  { path: "/listing-detail/:address", component: ListingStayDetailPage },
];

const Routes = () => {
  return (
    <BrowserRouter >
      <ScrollToTop />
      <SiteHeader />

      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
