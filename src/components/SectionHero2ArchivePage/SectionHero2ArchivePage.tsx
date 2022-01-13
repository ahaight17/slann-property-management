import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";

export interface SectionHero2ArchivePageProps {
  className?: string;
  properties?: any;
}

const SectionHero2ArchivePage: FC<SectionHero2ArchivePageProps> = ({
  className = "",
  children,
  properties
}) => {
  return (
    <div
      className={`nc-SectionHero2ArchivePage relative ${className}`}
      data-nc-id="SectionHero2ArchivePage"
    >
      <div className="absolute -bottom-10 top-52 md:inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <img
          className="  object-cover w-full h-full"
          src="http://cdn.andrewemery.io/old_main.png"
          alt="hero"
        />
      </div>
      <div className="relative flex flex-col-reverse items-start md:block pb-14 md:py-14 ">
        <div className="relative inline-flex">
          <div className="w-screen -right-10 inset-y-0 absolute bg-primary-500"></div>
          <div className="relative max-w-2xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 space-y-8 sm:space-y-10 text-white">
            <h2 className="font-medium text-4xl md:text-3xl xl:text-6xl leading-[110%]">
              Slann Properties
            </h2>
            <div className="flex items-center text-base md:text-lg ">
              <i className="text-2xl las la-map-marked"></i>
              <span className="ml-2.5">Clemson, SC</span>
              <span className="mx-5"></span>
              <i className="text-2xl las la-home"></i>
              <span className="ml-2.5">{ properties.data ? properties.data.length : '--'} properties</span>
            </div>
          </div>
        </div>
        {/* <div className="mb-10 md:mb-0 md:mt-10 w-full">
          <HeroRealEstateSearchForm />
        </div> */}
      </div>
    </div>
  );
};

export default SectionHero2ArchivePage;
