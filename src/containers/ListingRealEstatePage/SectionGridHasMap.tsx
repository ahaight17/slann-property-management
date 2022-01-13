import React, { FC, useEffect, useRef, useState } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import GoogleMapReact from "google-map-react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";

const MINPRICE = 0
const MAXPRICE = 2000

export interface SectionGridHasMapProps {
  properties?: any;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({
  properties,
}) => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);

  const [listings, setListings]:any = useState(properties.data || [])
  const [propertyAvailable, setPropertyAvailable] = useState(false)
  const [rangePrices, setRangePrices] = useState([MINPRICE, MAXPRICE]);
  const [sort, setSort] = useState(0)

  useEffect(() => {

  }, [propertyAvailable])

  useEffect(() => {
    let sorted;
    if(properties.data){
      if(sort === 0){
        sorted = properties.data.sort((a:any, b:any) => a.price - b.price)
      } else {
        sorted = properties.data.sort((a:any, b:any) => b.price - a.price)
      }
      setListings([...sorted])
    }
  }, [properties])

  useEffect(() => {
    let sorted;
    if(sort === 0){
      sorted = listings.sort((a:any, b:any) => a.price - b.price)
    } else {
      sorted = listings.sort((a:any, b:any) => b.price - a.price)
    }
    setListings([...sorted])
  }, [sort])

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          <Heading2
            heading="Properties in Clemson"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                { properties.data ? properties.data.length : '--'} properties
              </span>
            }
          />
          <div className="mb-8 lg:mb-11">
            <TabFilters 
              propertyAvailable={propertyAvailable}
              setPropertyAvailable={setPropertyAvailable}
              rangePrices={rangePrices}
              setRangePrices={setRangePrices}
              sort={sort}
              setSort={setSort}
              MINPRICE={MINPRICE}
              MAXPRICE={MAXPRICE}
            />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {listings.filter((item:any) => (item.price >= rangePrices[0] && item.price <= rangePrices[1] && (propertyAvailable ? item.available === true : true))).map((item:any) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <PropertyCardH data={item} />
              </div>
            ))}
          </div>
          {/* <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div> */}
        </div>

        <div
          className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
          onClick={() => setShowFullMapFixed(true)}
        >
          <i className="text-lg las la-map"></i>
          <span>Show map</span>
        </div>

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            {/* <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm text-neutral-800"
                name="xx"
                label="Search as I move the map"
              />
            </div> */}
            {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}

            <GoogleMapReact
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GCP_API_KEY}`,
              }}
              defaultZoom={13}
              yesIWantToUseGoogleMapApiInternals
              defaultCenter={ properties.data ? properties.data[0].map : {lat: 34.688679, lng: -82.834877}}
            >
              { properties.data && properties.data.map((item:any) => (
                <AnyReactComponent
                  isSelected={currentHoverID === item._id}
                  key={item._id}
                  lat={item.map.lat}
                  lng={item.map.lng}
                  listing={item}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
