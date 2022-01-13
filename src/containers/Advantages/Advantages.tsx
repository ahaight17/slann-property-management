import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Heading from "components/Heading/Heading";

export interface PageAboutProps {
  className?: string;
}

const Advantages: FC<PageAboutProps> = ({ className = "" }) => {

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

      <div className="container py-8 lg:py-20 space-y-8 lg:space-y-16 h-full">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Advantages to Slann Properties
        </h2>
        <div className="justify-between items-start w-full gap-x-6">
          <div id="single-entry-content" className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark">
            <p>
              We have worked hard to establish key business relationships with reasonably priced, high quality service providers and vendors. It is inevitable that at some point you will need someone to deal with plumbing, heating and air conditioning, general carpentry, and several other issues. It is important that each issue is corrected quickly, properly, and cost effectively.
              <br />
              <br />
              In addition to the above mentioned advantage, is our aggressive marketing campaign to ensure that we achieve the highest percentage of occupancy possible. This is done by advertising in Clemson University's newspaper, The Tiger, as well as posting elsewhere around town. Most importantly, we believe in positive word of mouth advertising. We suggest paying a $50 referral fee to current tenants if they bring in new customers. This proven method goes a lot farther than simply placing the sign in the yard. We also place signs in the front yard of each house, however, that is not the end of advertising. For us it is only the beginning.
              <br />
              <br />
              One more advantage that Slann Property Management, LLC brings to you is the ability to list and sell your rental property if you so desire. Not only are we licensed in property management, we also have a licensed real-estate agent. At Slann Property Management, LLC we will maximize the value of your property, whether it is through renting your property or maximizing your equity in the property.
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
