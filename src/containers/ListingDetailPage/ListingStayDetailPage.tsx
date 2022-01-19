import { FC, useEffect, useState } from "react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import GoogleMapReact from "google-map-react";
import { useParams } from "react-router-dom";
import { useSingleProperty } from "net/properties";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface ListingStayDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const params:any = useParams()

  const property = useSingleProperty(params.id)

  if(property.data && Object.entries(property.data).length === 0) window.location.assign(window.location.origin)

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

  const handleEditClick = () => {
    window.location.assign(`${window.location.origin}/edit-listing/${params.id}`);
  }

  const handlePhotosClick = () => {
    window.location.assign(`${window.location.origin}/edit-photos/${params.id}`);
  }

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold capitalize">
          { property.data ? property.data.address : '---'}
        </h2>

        {/* 3 */}
        <div className="grid grid-cols-2 sm:flex items-start sm:space-x-4 gap-4 sm:gap-0">
          <span className="">
            <i className="las la-map-marker-alt"></i>
            <span className="capitalize ml-1">{ property.data ? `${property.data.city}, ${property.data.state.toUpperCase()}` : '--, --'}</span>
          </span>
          <span className="flex items-start justify-center sm:justify-start px-3 py-2 border border-primary-50 rounded leading-none text-base font-medium text-primary-50">
            { property.data ? `$${property.data.price}/mo` : '---/mo'}
          </span>
          <span className="flex items-start justify-center sm:justify-start px-3 py-2 border border-primary-50 rounded leading-none text-base font-medium text-primary-50">
            { property.data ? `$${property.data.deposit} Deposit` : '--- Deposit'}
          </span>
          { property.data && 
            <div className="flex flex-col items-center justify-center sm:gap-x-4">
              <span className={`flex items-center justify-center px-3 py-2 border rounded leading-none text-base font-medium ${property.data.available !== true ? 'border-neutral-500 text-neutral-500' : 'border-secondary-500 text-secondary-500'}`}>
                { property.data.available === true ? 'AVAILABLE' : 'UNAVAILABLE' }
              </span>
              <span className="text-sm text-neutral-900 dark:text-neutral-400 pt-2">
                { property.data.available !== true && property.data.available}
              </span>
            </div>
          }
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              { property.data ? property.data.bedrooms : '--' } <span className="hidden sm:inline-block">Bedrooms</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
            { property.data ? property.data.bathrooms : '--' } <span className="hidden sm:inline-block">Baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-expand-arrows-alt text-2xl"></i>
            <span className=" ">
            { property.data ? property.data.sqft : '--' } <span className="hidden sm:inline-block">Sq Ft</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300 grid gap-y-2">
          { property.data && 
            property.data.description.split('\n').map((descLine:any) => (
              <span>
                {descLine}
              </span>
            ))
          }
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <div className="rounded-xl overflow-hidden">
            { property.data && 
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: `${process.env.REACT_APP_GCP_API_KEY}`,
                }}
                defaultZoom={15}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={{
                  lat: property.data.map.lat,
                  lng: property.data.map.lng,
                }}
              >
                <LocationMarker lat={property.data.map.lat} lng={property.data.map.lng} />
              </GoogleMapReact>
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ListingStayDetailPage  ${className}`}
      data-nc-id="ListingStayDetailPage"
    >
      <main className="container mt-11 flex justify-center">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10 mb-4">
          <div className="flex justify-end space-x-5">
            <ButtonSecondary onClick={handleEditClick}>Edit Listing</ButtonSecondary>
            <ButtonSecondary onClick={handlePhotosClick}>Edit Photos</ButtonSecondary>
          </div>
          {renderSection1()}
          {renderSection2()}
          {renderSection7()}
        </div>

      </main>
    </div>
  );
};

export default ListingStayDetailPage;
