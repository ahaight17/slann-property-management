import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Heading from "components/Heading/Heading";

export interface PageAboutProps {
  className?: string;
}

const WhyUs: FC<PageAboutProps> = ({ className = "" }) => {

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
  }, [])

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>Slann Properties || Why Us?</title>
      </Helmet>

      <div className="container py-8 lg:py-20 space-y-8 lg:space-y-16 h-full">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Why Us?
        </h2>
        <div className="grid grid-cols-2 justify-between items-start w-full gap-6">
          <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <h2>We strive to be the best!</h2>
            <p>
              We are interested in providing our customers and clients with the best possible service. Our goal is to not necessarily be the biggest, but to be the best. We specialize in single family homes in the Clemson area.
            </p>
          </div>
          <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <h2>We charge less! </h2>
            <p>
              In fact, we charge 10 percent less than our competitors. We charge a nine percent (9%) monthly management fee. Our competitors charge a ten percent (10%) monthly management fee. We do not charge finder's fees, leasing fees, or origination fees because we believe it is part of our job. Our competitors often charge such fees.
            </p>
          </div>
          <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <h2>We keep you informed!</h2>
            <p>
              Each property will be monitored on a regular basis to ensure that it is properly maintained and in compliance with all city ordinances and lease terms.
            </p>
          </div>
          <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <h2>We provide instant services!</h2>
            <p>
              We can directly deposit monthly rent proceeds into your local account. We will call you immediately when questions or problems arise.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <span>Call (864) 654-1007 or email <a className="text-primary-500" href="mailto:shelley@slannproperties.com">shelley@slannproperties.com</a>.</span>
          <span>For a sample management agreement <a className="text-primary-500" href="http://slannproperties.com/managementagreement.pdf">click here</a>.</span>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
