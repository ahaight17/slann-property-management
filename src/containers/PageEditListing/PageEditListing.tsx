import Label from "components/Label/Label";
import ReactLoading from 'react-loading'
import { useSingleProperty } from "net/properties";
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
import moment from "moment";

const PageEditListing: any = () => {
  const params:any = useParams()
  const [address, setAddress]:any = useState(undefined)
  const [city, setCity]:any = useState(undefined)
  const [state, setState]:any = useState(undefined)
  const [deposit, setDeposit]:any = useState(undefined)
  const [rent, setRent]:any = useState(undefined)
  const [sqft, setSqft]:any = useState(undefined)
  const [beds, setBeds]:any = useState(undefined)
  const [baths, setBaths]:any = useState(undefined)
  const [desc, setDesc]:any = useState(undefined)
  const [selected, setSelected]:any[] = useState([false, false])
  const [submit, setSubmit]:any = useState(false);
  const [availableDate, setAvailableDate]:any = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // default to clemson
  const [map, setMap]:any = useState({lat: 34.688679, lng: -82.834877})
  const [fulllLocation, setFullLocation]:any = useState();

  const property = useSingleProperty(params.id)

  const windowSize = useWindowSize()

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
      map: map
    }

    fetch(`${process.env.REACT_APP_API_SERVER}/property/editProperty/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      window.location.assign(`${window.location.origin}/listing-detail/${params.id}`)
    }).catch((e) => {
      console.error(e)
    })

    return;
  }

  const handleCancel = () => {
    window.location.assign(`${window.location.origin}/listing-detail/${params.id}`)
  }

  const geocodeLocation = () => {
    if(state.length === 2){
      const params = encodeURIComponent(`${address}, ${city}, ${state}`)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.REACT_APP_GCP_API_KEY}`).then((res) => {
        return res.json()
      }).then((data) => {
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
    if(property.data){
      setAddress(property.data.address)
      setCity(property.data.city)
      setState(property.data.state)
      setRent(property.data.price)
      setDeposit(property.data.deposit)
      setSqft(property.data.sqft)
      setBeds(property.data.bedrooms)
      setBaths(property.data.bathrooms)
      setDesc(property.data.description)
      setMap(property.data.map)
      if(property.data.available === true){
        setSelected([property.data.available, false])
      } else {
        setSelected([false, true])
        setAvailableDate(moment(property.data.available))
      }
    }
  }, [property.data])

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


  if(property.isLoading){
    return (
     <div>
       <div className="flex justify-center items-center container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-2 my-16">
          <ReactLoading type="spin" color="#F56600" height={'50vh'} width={'25vw'}/>
        </header>
      </div>
     </div>
    )
  } else if(property.data){
    return (
      <div
        className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
        data-nc-id="PageAddListing1"
      >
        <div className="space-y-11">

          {/* --------------------- */}
          <div className="listingSection__wrap ">
            <h2 className="text-2xl font-semibold">Edit Listing</h2>
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
                <Textarea rows={2} onChange={(e) => setDesc(e.target.value)} value={desc}/>
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
            <ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>
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
  } else if(property.isErr){
    window.location.assign(window.location.origin);
  }
};

export default PageEditListing;
