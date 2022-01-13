import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Heading from "components/Heading/Heading";

export interface PageAboutProps {
  className?: string;
}

const FAQ: FC<PageAboutProps> = ({ className = "" }) => {

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
        <title>Slann Properties || FAQ</title>
      </Helmet>

      <div className="container py-8 lg:py-20 h-full grid grid-cols-2 gap-x-6">
        <div>
          <h2 className="flex mb-10 items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-start">
            General FAQ
          </h2>
          <div className="grid grid-cols-1 justify-between items-start w-full gap-6">
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>How many people can live in a house?</h2>
              <p>
                If the house is located within the city limits of Clemson, this depends on the zoning and licensing restrictions imposed by the City on each house. The occupancy of a residence is determined by the zoning district where it is located. In a single family district, where most of our houses are located, the occupancy is normally limited to either two or three unrelated individuals, depending on the grandfathered status of the house. We do have several houses that are exceptions to that rule. The description of each house on our website outlines the occupancy limitations for that particular house. If the house's description doesn't mention occupancy, then there is no official limit. However, as a general rule if there is no limit, we prefer that there be no more than one person per bedroom. Additional occupants will increase the monthly rental amount.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>What is required in order to sign a lease? </h2>
              <p>
                You must be at least 18 years of age in order to be eligible to sign a lease. You will need to provide us with a copy of your driver's license or state issued ID card and you must complete a rental application (see forms section for an example). Regardless of age, we also require a parental/sponsor guarantee (see forms section for an example). However, if you are employed full-time and have proof of income that will support your monthly lease payment, a parental/sponsor guarantee form is not required.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Can I pay my rent by the Semester?</h2>
              <p>
                Yes. We do accept prepayments if they are made in the form of one check.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>My roommate dropped out of school, what does that mean for my rent?</h2>
              <p>
                The monthly rent remains the same. Each person on the lease is still responsible for the full rental amount. It would be in your best interest to find another roommate or you may have to make up the difference.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Do you allow pets?</h2>
              <p>
                Yes, however only in specific houses and you must have consent from the landlord and your roommates, and a pet addendum must be signed. There is a non-refundable pet fee of $250.00 per pet and no more than 2 pets are permitted. You are ultimately responsible for your pet and any damages it may cause. For safety and liability reasons, we do have breed, age, and weight restrictions (no aggressive breeds, minimum of 9 months old, and maximum of 100lbs.)
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Do you require renters insurance?</h2>
              <p>
                No. We do not require it; however the insurance that we carry is only for the structure and NOT the contents. We strongly recommend a renters insurance policy to protect your belongings.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Where is my security deposit?</h2>
              <p>
                By law, your security deposit is held in a special escrow account and is fully refundable if the terms of the lease are fulfilled and the house is vacated in proper order.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Do you offer short term leases?</h2>
              <p>
                It is very rare for us to be able to offer a lease term shorter than 12 months. There are some exceptions, but few and far between. If a lease term is shorter than 12 months, it will be stated in the property description.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Can I sublet?</h2>
              <p>
                Yes. Subleasing is allowed, however the people who are on the original lease are ultimately responsible for the remaining term of lease. You must have our written consent, the consent of your roommates, pay the $75.00 sublease fee, and have the proper paperwork completed and returned.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Why is my water bill so high?</h2>
              <p>
                Probably because you have a toilet that is running or a faucet that is dripping. We can only repair problems that you tell us about.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Are utilities includes?</h2>
              <p>
                No. With few exceptions, all utilities are the responsibility of the tenants. If any utilities are included in the rental amount, it will be stated in the property description.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Is high speed internet available?</h2>
              <p>
                This depends on location. AT&T and Northland Cable provide high speed service to this area -- please check with them for specifics.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="flex mb-10 items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-start">
            Business FAQ
          </h2>
          <div className="grid grid-cols-1 justify-between items-start w-full gap-6">
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>How much can I rent my house for? </h2>
              <p>
                This mainly depends on the size, the distance to campus, and the overall condition. As a general rule of thumb, we base our prices on about $375/bedroom.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>What type of insurance do I need for my rental home? </h2>
              <p>
                You will need a Rental Dwelling Policy. This will only cover replacement costs of the structure, not the contents. Talk to your insurance agent about a non-owner occupied insurance policy.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>What are some typical maintenance issues?</h2>
              <p>
                Leaking faucets and toilets, HVAC issues, and pest control are some of the most common maintenance requests.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>How and when do I receive my rent proceeds?</h2>
              <p>
                Your rent proceeds will be disbursed to you within 10 business days after the 5th of each month. If that day falls on a weekend or holiday, proceeds will be disbursed on the next available business day. If you prefer, we can deposit your proceeds directly into your bank account if your bank has a local branch in Clemson.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>Where is the security deposit?</h2>
              <p>
                By law, the security deposit is held in a special escrow account and is fully refundable to the tenant if the lease is fulfilled and the house is vacated in proper order. We may use a portion of the funds from the security deposit to offset expenses that arise due to tenant negligence, however the deposit does not belong to and will never be refunded to the owner.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>I do not want students living in my house; can you manage it for me?</h2>
              <p>
                No! We will not discriminate.
              </p>
            </div>
            <div className="prose dark:prose-invert prose-sm w-full sm:prose lg:prose-lg dark:prose-dark" style={{maxWidth: 'unset'}}>
              <h2>What types of property do you manage?</h2>
              <p>
                Currently we only manage privately owned residential units and homes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
