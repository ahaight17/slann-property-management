import StayCard from "components/StayCard/StayCard";
import  { FC, useEffect, useState, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Helmet } from "react-helmet";
import { Dialog, Transition } from "@headlessui/react";
import { useAllProperties } from "net/properties";
import TabFilters from "./TabFilters";
import { ExclamationIcon } from "@heroicons/react/solid";



export interface AuthorPageProps {
  className?: string;
}

const AllListings: FC<AuthorPageProps> = ({ className = "" }) => {

  const properties = useAllProperties();

  const [listings, setListings]:any = useState([])
  const [propertyAvailable, setPropertyAvailable] = useState(false)
  const [sort, setSort] = useState(0)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [name, setName] = useState()
  const [id, setId] = useState()
  const [loading, setLoading] = useState(false)
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    if(properties.data){
      let sorted = properties.data;
      switch(sort){
        case 0:
          sorted.sort((a:any, b:any) => a.price - b.price)
          break;
        case 1:
          sorted.sort((a:any, b:any) => b.price - a.price)
          break;
        case 2:
          sorted.sort((a:any, b:any) => parseInt(a.title) - parseInt(b.title))
          break;
        case 3:
          sorted.sort((a:any, b:any) => parseInt(b.title) - parseInt(a.title))
          break;
        default:
          break;
      }
      setListings([...sorted])
    }
  }, [sort, properties.data])

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

  const _renderLoading = () => {
    return (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  const handlePropertyDelete = async () => {
    setLoading(true)
    const token = await getAccessTokenSilently();

    fetch(`${process.env.REACT_APP_API_SERVER}/property/deleteProperty/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
    }).then(() => {
      setDeleteOpen(false)
      setLoading(false)
      window.location.assign(window.location.href)
    }).catch((e) => {
      console.error(e)
    })
  }


  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h1 className="text-2xl font-semibold">All Listings</h1>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <TabFilters
          propertyAvailable={propertyAvailable}
          setPropertyAvailable={setPropertyAvailable}
          sort={sort}
          setSort={setSort}
        />
        <div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
              { listings.filter((item:any) => (propertyAvailable ? item.available === true : true)).map((stay:any) => (
                <StayCard key={stay._id} data={stay} setDeleteOpen={setDeleteOpen} setName={setName} setId={setId}/>
              ))}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Slann Properties || Management</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row justify-center">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
        </div>
      </main>
      <Transition.Root show={deleteOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setDeleteOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-neutral-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-neutral-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-400">
                      Delete {name}?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-neutral-900 dark:text-neutral-400">
                        Are you sure you want to delete this property listing?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handlePropertyDelete}
                >
                  {loading && _renderLoading()}
                  Delete Property
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  );
};

export default AllListings;
