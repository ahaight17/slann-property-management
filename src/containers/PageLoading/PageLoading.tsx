import ButtonPrimary from "shared/Button/ButtonPrimary";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import ReactLoading from 'react-loading'

const PageLoading: React.FC = () => {
  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-base";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);

  return (
    <div className="nc-Page404 mt-20">
      <Helmet>
        <title>Slann Properties || Management</title>
      </Helmet>
      <div className="flex justify-center items-center container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-2 my-16">
          <ReactLoading type="spin" color="#F56600" height={'50vh'} width={'25vw'}/>
        </header>
      </div>
    </div>
  );
}

export default PageLoading;
