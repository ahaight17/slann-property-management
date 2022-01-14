import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import FormItem from "./FormItem";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [address, setAddress]:any = useState(undefined)
  const [city, setCity]:any = useState(undefined)
  const [state, setState]:any = useState(undefined)
  const [rent, setRent]:any = useState(undefined)
  const [sqft, setSqft]:any = useState(undefined)
  const [beds, setBeds]:any = useState(undefined)
  const [baths, setBaths]:any = useState(undefined)
  const [desc, setDesc]:any = useState(undefined)
  const [selected, setSelected]:any[] = useState([false, false])
  const [aMonth, setAMonth]:any = useState('January')
  const [aYear, setAYear]:any = useState(new Date().getUTCFullYear());
  const [submit, setSubmit]:any = useState(false)

  // default to clemson
  const [map, setMap]:any = useState({lat: 34.688679, lng: -82.834877})
  const [fulllLocation, setFullLocation]:any = useState();

  const handleClick = () => {
    setSubmit(true)

    const body = {
      featuredImage: '',
      galleryImgs: [],
      title: address,
      address: address,
      city: city,
      state: state,
      price: rent,
      bedrooms: beds,
      bathrooms: baths,
      sqft: sqft,
      available: (selected[1] && aMonth !== undefined && aYear !== undefined) ? `${aMonth} ${aYear}` : true,
      description: desc,
      map: map
    }

    fetch(`${process.env.REACT_APP_API_SERVER}/property/uploadProperty`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.location.assign(window.location.origin)
    }).catch((e) => {
      console.error(e)
    })

    return;
  }

  const geocodeLocation = () => {
    if(state.length === 2){
      const params = encodeURIComponent(`${address}, ${city}, ${state}`)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.REACT_APP_GCP_API_KEY}`).then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data);
        setFullLocation(data.results[0].formatted_address)
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
              <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address} required/>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
              <FormItem label="City">
                <Input type="text" onChange={(e) => setCity(e.target.value)} value={city}/>
              </FormItem>
              <FormItem label="State">
                <Input style={{textTransform: 'uppercase'}} maxLength={2} type="text" onChange={(e) => setState(e.target.value)} value={state}/>
              </FormItem>
            </div>
            <div>
              <Label>Generated Detailed address</Label>
              <div className="mt-2 w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {fulllLocation}
              </span>
            </div>
            <FormItem label="Rent/month">
              <Input type="number" pattern="\d*" onChange={(e) => setRent(e.target.value)} value={rent}/>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
              <FormItem label="Beds">
                <Input type="number" onChange={(e) => setBeds(e.target.value)} value={beds}/>
              </FormItem>
              <FormItem label="Baths">
                <Input type="number" onChange={(e) => setBaths(e.target.value)} value={baths}/>
              </FormItem>
              <FormItem label="Sq Ft">
                <Input type="number" onChange={(e) => setSqft(e.target.value)} value={sqft}/>
              </FormItem>
            </div>
            <FormItem label="Description">
              <Textarea rows={2} onChange={(e) => setDesc(e.target.value)} value={desc}/>
            </FormItem>
            <FormItem label="Property Availability">
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Checkbox label="Available" name="Available" onChange={(e) => setSelected((old:any) => [e, old[1]])} disabled={selected[1]}/>
                <Checkbox label="Unavailable" name="Unavailable" onChange={(e) => setSelected((old:any) => [old[0], e])} disabled={selected[0]}/>
              </div>
            </FormItem>
            { selected[1] && 
              <FormItem label="Available when?">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <FormItem label="Month">
                    <Select onChange={(e) => setAMonth(e.target.value)} value={aMonth}>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="Ausust">Ausust</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </Select>
                  </FormItem>
                  <FormItem label="Year">
                    <Input type="number" onChange={(e) => setAYear(e.target.value)} value={aYear}/>
                  </FormItem>
                </div>
              </FormItem>
            }
          </div>
        </div>

        {/* --------------------- */}
        { address &&
          city &&
          state &&
          rent && 
          beds &&
          baths && 
          sqft &&
          desc &&
          ( selected[0] || selected[1] ) &&
          <div className="flex justify-end space-x-5">
            { submit && 
              <ButtonSecondary loading>Submitting</ButtonSecondary>
            }
            { !submit && 
              <ButtonSecondary onClick={handleClick}>Submit</ButtonSecondary>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default PageAddListing2;
