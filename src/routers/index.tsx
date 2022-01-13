import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import MaintenanceRequest from "containers/MaintenanceRequest/MaintenanceRequest";
import PageAbout from "containers/AboutUs/AboutUs";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import SiteHeader from "containers/SiteHeader";
import WaitingList from "containers/WaitingList/WaitingList";
import WhyUs from "containers/WhyUs/WhyUs";
import Advantages from "containers/Advantages/Advantages";
import FAQ from "containers/FAQ/FAQ";
import AccountPage from "containers/AccountPage/AccountPage";
import AllListings from "containers/AllListings/AllListings";

export const pages: Page[] = [
  { path: "/", exact: true, component: AllListings },
  { path: "/maintenance", component: MaintenanceRequest },
  { path: "/waiting-list", component: WaitingList },
  { path: "/about", component: PageAbout },
  { path: "/why-us", component: WhyUs },
  { path: "/advantages", component: Advantages },
  { path: "/faq", component: FAQ },
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
