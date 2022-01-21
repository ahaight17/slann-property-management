import { FC, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Checkbox from "shared/Checkbox/Checkbox";
import { useSettings } from "net/settings";

export interface Settings {}

const Settings: FC<Settings> = () => {
  const [waitingList, setWaitingList] = useState()
  const [submit, setSubmit]:any = useState(false)
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const settings = useSettings();

  const handleClick = async () => {
    setSubmit(true)
    const token = await getAccessTokenSilently();


    const body = {
      waitingList: waitingList
    }

    fetch(`${process.env.REACT_APP_API_SERVER}/settings/setWaitingList`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      window.location.assign(`${window.location.origin}`)
    }).catch((e) => {
      console.error(e)
    })

    return;
  }


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

  useEffect(() => {
    if(settings.data && waitingList !== settings.data.waitingList){
      setWaitingList(settings.data.waitingList)
    }
  }, [settings.data])

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        {/* --------------------- */}
        <div className="listingSection__wrap ">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox label="Show waiting list?" name="Show waiting list?" onChange={(e:any) => setWaitingList(e)} checked={waitingList}/>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-5">
          { submit &&
            <ButtonSecondary loading>Saving</ButtonSecondary>
          }
          { !submit &&
            <ButtonSecondary onClick={handleClick}>Save Changes</ButtonSecondary>
          }
        </div>
      </div>
    </div>
  );
};

export default Settings;
