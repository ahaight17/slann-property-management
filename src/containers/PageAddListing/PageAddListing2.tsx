import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import FormItem from "./FormItem";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [address, setAddress]:any = useState()
  const [city, setCity]:any = useState()
  const [state, setState]:any = useState()
  // default to clemson
  const [map, setMap]:any = useState({lat: 34.688679, lng: -82.834877})

  const handleClick = () => {
    console.log('click')
    return;
  }

  const geocodeLocation = () => {
    if(state.length === 2){
      const params = encodeURIComponent(`${address}, ${city}, ${state}`)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.REACT_APP_GCP_API_KEY}`).then((res) => {
        return res.json()
      }).then((data) => {
        setMap(data.results[0].geometry.location)
      }).catch((e) => {
        console.error(e)
      })
    }
  }

  useEffect(() => {
    if(address && city && state) {
      geocodeLocation();
    }
  }, [address, city, state])
  
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
  
  const renderMapWithMarker = () => {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GCP_API_KEY}`,
        }}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={map}
      >
        <LocationMarker lat={map.lat} lng={map.lng} />
      </GoogleMapReact>
    )
  }

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        {/* <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 10
          </span>
        </div> */}

        {/* --------------------- */}
        <div className="listingSection__wrap ">
          <h2 className="text-2xl font-semibold">Add Listing</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            <FormItem label="Address">
              <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address}/>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
              <FormItem label="City">
                <Input type="text" onChange={(e) => setCity(e.target.value)} value={city}/>
              </FormItem>
              <FormItem label="State">
                <Input style={{textTransform: 'uppercase'}} maxLength={2} type="text" onChange={(e) => setState(e.target.value)} value={state}/>
              </FormItem>
            </div>
            <FormItem label="Rent/month">
              <Input type="number"/>
            </FormItem>
            <FormItem label="Country/Region">
              <Select>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Thailand">Thailand</option>
                <option value="France">France</option>
                <option value="Singapore">Singapore</option>
                <option value="Jappan">Jappan</option>
                <option value="Korea">Korea</option>
                <option value="...">...</option>
              </Select>
            </FormItem>
            <FormItem label="Street">
              <Input placeholder="..." />
            </FormItem>
            <FormItem label="Room number (optional)">
              <Input />
            </FormItem>
            <div>
              <Label>Detailed address</Label>
              { address && city && state && 
                <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {`${address}, ${city}, ${state}`}
                </span>
              }
              <div className="mt-4">
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                  <div className="rounded-xl overflow-hidden">
                    {renderMapWithMarker()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          <ButtonSecondary onClick={handleClick}>Submit</ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default PageAddListing2;
