import StayCard from "components/StayCard/StayCard";
import  { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { useAllProperties } from "net/properties";

export interface AuthorPageProps {
  className?: string;
}

const AllListings: FC<AuthorPageProps> = ({ className = "" }) => {
  const properties = useAllProperties();

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h1 className="text-2xl font-semibold">All Listings</h1>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
              { properties.data && properties.data.map((stay:any) => (
                <StayCard key={stay._id} data={stay} />
              ))}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Slann Properties || Management</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row justify-center">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default AllListings;
