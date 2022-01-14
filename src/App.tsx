import React from "react";
import MyRouter from "routers/index";
import { withAuthenticationRequired } from '@auth0/auth0-react';

// function App() {
//   return (
//     <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200" style={{minHeight: '100vh'}}>
//       <MyRouter />
//     </div>
//   );
// }

const PrivateRoute = () => (
  <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200" style={{minHeight: '100vh'}}>
    <MyRouter />
  </div>
);

const publicStyle = {

  backgroundImage: `url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs-i.huffpost.com%2Fgen%2F4254928%2Fimages%2Fo-FOOT-PAIN-facebook.jpg&f=1&nofb=1")`,
  cover: "fit",
  height: "100vh",
  width: "100vw"
}

const PublicRoute = () => (
  <div className="testing" style={publicStyle}></div>
);

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<PublicRoute />)
});
// export default App;
