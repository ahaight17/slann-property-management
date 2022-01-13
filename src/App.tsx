import React from "react";
import MyRouter from "routers/index";

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200" style={{minHeight: '100vh'}}>
      <MyRouter />
    </div>
  );
}

export default App;
