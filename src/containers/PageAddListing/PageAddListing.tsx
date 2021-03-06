import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import FormItem from "./FormItem";
import { SingleDatePicker } from "react-dates";
import useWindowSize from "hooks/useWindowResize";
const CLEMSON = {lat: 34.688679, lng: -82.834877}
const R = 3958.8
const toRadian = (Math.PI/180)

export interface PageAddListingProps {}

const PageAddListing: FC<PageAddListingProps> = () => {
  const params:any = useParams()
  const [address, setAddress]:any = useState(undefined)
  const [city, setCity]:any = useState(undefined)
  const [state, setState]:any = useState('SC')
  const [rent, setRent]:any = useState(undefined)
  const [deposit, setDeposit]:any = useState(undefined)
  const [sqft, setSqft]:any = useState(undefined)
  const [beds, setBeds]:any = useState(undefined)
  const [baths, setBaths]:any = useState(undefined)
  const [desc, setDesc]:any = useState(undefined)
  const [distance, setDistance]:any = useState(undefined)
  const [selected, setSelected]:any[] = useState([false, false])
  const [availableDate, setAvailableDate]:any = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const [submit, setSubmit]:any = useState(false)
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const windowSize = useWindowSize()

  // default to clemson
  const [map, setMap]:any = useState({lat: 34.688679, lng: -82.834877})
  const [fulllLocation, setFullLocation]:any = useState();

  const handleClick = async () => {
    setSubmit(true)
    const token = await getAccessTokenSilently();


    const body = {
      title: address,
      address: address,
      city: city,
      state: state,
      price: rent,
      deposit: deposit,
      bedrooms: beds,
      bathrooms: baths,
      sqft: sqft,
      available: (selected[1] && availableDate !== null) ? availableDate.format('MMMM DD, YYYY') : true,
      description: desc,
      map: map,
      distance: distance
    }

    fetch(`${process.env.REACT_APP_API_SERVER}/property/uploadProperty`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      window.location.assign(`${window.location.origin}/edit-photos/${data.insertedId}`)
    }).catch((e) => {
      console.error(e)
    })

    return;
  }

  const calculateDistToCampus = (location:any) => {
    let rl1 = location.lat * toRadian
    let rl2 = CLEMSON.lat * toRadian
    let difflat = rl2 - rl1
    let difflon = (CLEMSON.lng - location.lng) * toRadian

    let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rl1)*Math.cos(rl2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    console.log(d)
    setDistance(d);
  }

  const geocodeLocation = () => {
    if(city.length >= 3){
      const params = encodeURIComponent(`${address}, ${city}, ${state}`)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.REACT_APP_GCP_API_KEY}`).then((res) => {
        return res.json()
      }).then((data) => {
        setFullLocation(data.results[0].formatted_address)
        setMap(data.results[0].geometry.location)
        calculateDistToCampus(data.results[0].geometry.location)
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

  const handleDateFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
  };
  
  const renderInputCheckInDate = () => {
    const focused = focusedInput;
    return (
      <div
        className={`flex w-full relative items-center space-x-3 cursor-pointer ${
          focused ? "shadow-2xl rounded-full" : ""
        }`}
        onClick={() => handleDateFocusChange({ focused: true })}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <span className="block xl:text-lg font-semibold">
            {availableDate ? availableDate.format('MMMM DD, YYYY') : "Piack a Date"}
          </span>
          
        </div>
      </div>
    );
  };

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
              <Label>Generated Detailed Address</Label>
              <div className="mt-2 w-20 border-b border-neutral-200 dark:border-neutral-700"></div>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {fulllLocation}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
              <FormItem label="Rent/month">
                <Input type="number" pattern="\d*" onChange={(e) => setRent(e.target.value)} value={rent}/>
              </FormItem>
              <FormItem label="Security Deposit">
                <Input type="number" pattern="\d*" onChange={(e) => setDeposit(e.target.value)} value={deposit}/>
              </FormItem>
            </div>
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
              <Textarea rows={6} onChange={(e) => setDesc(e.target.value)} value={desc}/>
            </FormItem>
            <FormItem label="Property Availability">
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Checkbox label="Available" name="Available" onChange={(e) => setSelected((old:any) => [e, old[1]])} disabled={selected[1]} checked={selected[0]}/>
                <Checkbox label="Unavailable" name="Unavailable" onChange={(e) => setSelected((old:any) => [old[0], e])} disabled={selected[0]} checked={selected[1]}/>
              </div>
            </FormItem>
            { selected[1] &&
                <div className={`relative flex`} style={{ flex: "1 0 0%" }}>
                  <div className="absolute inset-x-0 bottom-0">
                    <SingleDatePicker
                      date={availableDate}
                      onDateChange={(date) => setAvailableDate(date)}
                      id={"nc-hero-ExperiencesDateSingleInput-availableDateId"}
                      focused={focusedInput}
                      daySize={windowSize.width > 425 ? 56 : undefined}
                      orientation={"horizontal"}
                      onFocusChange={handleDateFocusChange}
                      noBorder
                      hideKeyboardShortcutsPanel
                      keepOpenOnDateSelect
                      numberOfMonths={1}
                    />
                  </div>

                  {renderInputCheckInDate()}
                </div>
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

export default PageAddListing;
