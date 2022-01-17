import MyRouter from "routers/index";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoading from "containers/PageLoading/PageLoading";

// function App() {
//   return (
//     <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200" style={{minHeight: '100vh'}}>
//       <MyRouter />
//     </div>
//   );
// }
// export default App;

const PrivateRoute = () => (
  <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200" style={{minHeight: '100vh'}}>
    <MyRouter />
  </div>
);

const PublicRoute = () => (
  <PageLoading />
);

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<PublicRoute />)
});
