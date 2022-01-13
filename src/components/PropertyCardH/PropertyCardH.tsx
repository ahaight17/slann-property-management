import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { Link } from "react-router-dom";

export interface PropertyCardHProps {
  className?: string;
  data?: any;
}


const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={data.galleryImgs}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`PropertyCardH-${Date.now()}-${data._id}`}
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-900 dark:text-neutral-400">
            {data.bedrooms} beds
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-900 dark:text-neutral-400">
            {data.bathrooms} baths
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-900 dark:text-neutral-400">
            {data.sqft} sq ft
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-5 w-full">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-medium capitalize">
              <span className="line-clamp-2">{data.title}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <div className="flex w-full justify-between items-start">
            {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
            <span className="flex items-start justify-start px-3 py-2 border border-neutral-900 text-neutral-900 dark:border-primary-50 rounded leading-none text-base font-medium dark:text-primary-50">
              {`$${data.price}/mo`}
            </span>
            <div className="flex flex-col items-center">
              <span className={`flex items-center justify-center px-3 py-2 border rounded leading-none text-base font-medium ${data.available !== true ? 'border-neutral-500 text-neutral-500' : 'border-secondary-500 text-secondary-500'}`}>
                { data.available === true ? 'AVAILABLE' : 'UNAVAILABLE' }
              </span>
              <span className="text-sm text-neutral-900 dark:text-neutral-400 pt-2">
                { data.available !== true && data.available}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow dark:hover:border-primary-700 hover:border-primary-700 ${className}`}
      data-nc-id="PropertyCardH"
    >
      <Link
        // replace all spaces in address with hyphen
        to={`listing-detail/${data.address.replace(/[ ]/g, '-')}`}
        className="h-full w-full flex flex-col sm:flex-row sm:items-center"
      >
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default PropertyCardH;
