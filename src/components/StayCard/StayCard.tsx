import React, { FC, Fragment, MouseEventHandler, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link } from "react-router-dom";
import Button from "shared/Button/Button";

export interface StayCardProps {
  className?: string;
  ratioClass?: string;
  data?: any;
  size?: "default" | "small";
  setDeleteOpen?: any
  setName?: any
  setId?: any,
}


const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
  ratioClass,
  setDeleteOpen,
  setName,
  setId,
}) => {

  const handleDeleteClick = (e:any) => {
    e.preventDefault()
    setDeleteOpen(true)
    setName(data.title)
    setId(data._id)
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`stay-v-${data._id}`}
          ratioClass={ratioClass}
          galleryImgs={data.galleryImgs}
        />
      </div>
    );
  };

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-5000 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-900 dark:text-neutral-400">
            {data.bedrooms} beds | {data.bathrooms} baths | {data.sqft} sqft
          </span>
          <div className="flex flex-cols items-center space-x-2 justify-between">
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data.title}</span>
            </h2>
            <Button
              className={`ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 py-2 sm:px-4`}
              onClick={handleDeleteClick}
            >
              <i className="las la-trash text-xl delete-property" />
            </Button>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ${data.price}/mo
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
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard" >
      <Link to={`/listing-detail/${data.address.replace(/[ ]/g, '-')}`}>
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default StayCard;
