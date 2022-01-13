import tal from "images/tal.jpg"
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Heading from "components/Heading/Heading";

export interface PageAboutProps {
  className?: string;
}

const AboutUs: FC<PageAboutProps> = ({ className = "" }) => {

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
        <title>Slann Properties || Management</title>
      </Helmet>

      <div className="container py-8 lg:py-20 h-full">
        <div className="mb-20 w-full">
          <div className="flex flex-row justify-between items-end gap-x-4 prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <div>
              <h1>👋 About Us</h1>
              <p>
                Slann Property Management, LLC was established in 2003. It is co-owned by Tal and Shelley Slann who are each licensed by the State of South Carolina as a realtor and property manager in charge, respectively. Tal and Shelley both grew up and continue to live in Clemson. As graduates of both Clemson University and The University of Tennessee, the Slanns appreciate the unique challenges that a college community represents.
              </p>
            </div>
            <figure>
              <img
                src={tal}
                alt="Tal Slann Headshot"
                className="rounded-2xl"
              />
            </figure>
          </div>
          <div className="mt-4 gap-x-4 prose dark:prose-invert prose-sm sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
            <p>
              We are located at 422 College Avenue, Suite 400 in downtown Clemson. For our tenants' convenience, we have a drop box for 24-hour rent payments. A tenant can report any problems to us by phone, fax, email, in person, or when dropping off their rent. This way, any and all problems will be handled in the fastest possible way. We try our best to correct small problems before they become big problems and to keep all of our tenants and property owners happy. 
            </p>
          </div>
        </div>
        <div className="flex space-x-10 justify-center items-center flex-wrap text-center">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="hidden sm:inline-block">
              <i className="las la-map-marker-alt text-2xl"></i>
            </span>
            <span className="text-md text-neutral-900 dark:text-neutral-400">
              422 College Avenue, Suite 400 Clemson, SC 29631
            </span>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="hidden sm:inline-block">
              <i className="las la-envelope-open-text text-2xl"></i>
            </span>
            <span className="text-md text-neutral-900 dark:text-neutral-400">
              <a href="mailto:shelley@slannproperties.com">shelley@slannproperties.com</a>
            </span>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="hidden sm:inline-block">
              <i className="las la-phone text-2xl"></i>
            </span>
            <span className="text-md text-neutral-900 dark:text-neutral-400">
              (864) 654-1007
            </span>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="hidden sm:inline-block">
              <i className="las la-fax text-2xl"></i>
            </span>
            <span className="text-md text-neutral-900 dark:text-neutral-400">
              (864) 654-1008 (fax)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
