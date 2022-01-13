import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SocialsList from "shared/SocialsList/SocialsList";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { KeyboardEventHandler } from "react";
import NcDropDown from "shared/NcDropDown/NcDropDown";
import Select from "shared/Select/Select";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";

export interface PageContactProps {
  className?: string;
}
const WaitingList: FC<PageContactProps> = ({ className = "" }) => {
  
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

  const formatNumber = (input:any) => {

    if(!input) return input

    const phoneNumber = input.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }

  const cleanPhoneNumber = (e: any) => {
    const input:any = document.getElementById('phone-number')
    const formattedNumber = formatNumber(input.value)

    input.value = formattedNumber
  }

  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Slann Properties || Waiting List</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Waiting List
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 gap-12 ">
            {/* <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div> */}
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Phone Number</Label>

                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="mt-1"
                    onKeyDown={cleanPhoneNumber}
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Property</Label>
                  
                  <Select className="mt-1">
                    {
                      DEMO_STAY_LISTINGS.map((listing: StayDataType) => (
                        <option value={listing.address}>{listing.address}</option>
                      ))
                    }
                  </Select>
                </label>
                <label className="block">
                  <Label>Comments</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit">Submit</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      {/* <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div> */}
    </div>
  );
};

export default WaitingList;
