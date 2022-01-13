import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import LoginButton from './LoginButton';

function Navigation() {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
      <LoginButton />
    </ul>
  );
}

export default Navigation;
