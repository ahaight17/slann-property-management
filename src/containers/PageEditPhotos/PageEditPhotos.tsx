import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { usePropertyPhotos } from "net/photos";
import { useSingleProperty } from "net/properties";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ReactLoading from 'react-loading'

export interface PageEditPhotosProps {}

const PageEditPhotos: FC<PageEditPhotosProps> = () => {
  const params:any = useParams()
  const photos = usePropertyPhotos(params.id)
  const property = useSingleProperty(params.id)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletePhoto, setDeletePhoto]:any = useState();
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submit, setSubmit]:any = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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


  const filesSelected = (e:any) => {
    setUploading(true)
    for(let i = 0; i < e.target.files.length; i++){
      if(e.target.files[i].type.split('/')[0] === 'image'){
        uploadPhoto(e.target.files[i]).then((err) => {
          if(err){
            console.error(err)
          }
          setUploading(false)
          window.location.assign(window.location.href)
        })
      }
    }
  }

  const uploadPhoto = async (photo:any) => {
    const token = await getAccessTokenSilently();

    const body = new FormData()
    body.append('image', photo)

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_SERVER}/photos/uploadPhoto/${params.id}/${photo.name}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: body
      }).then(() => {
        resolve(null)
      }).catch((e) => {
        console.error(e);
        reject(e)
      })
    })
  }

  const handleXClick = (e:any) => {
    e.target.classList.forEach((className:any, i:any) => {
      if(className.includes('photo-')){
        let index = parseInt(className.split('-')[1])
        setDeletePhoto(photos.data[index])
      }
      return
    })
    setDeleteOpen(true)
  }

  const handleDeleteImage = async () => {
    const token = await getAccessTokenSilently();

    setLoading(true)
    fetch(`${process.env.REACT_APP_API_SERVER}/photos/deletePhoto/`, {
      method: 'DELETE',
      body: JSON.stringify({
        key: deletePhoto.key
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      setLoading(false)
      setDeleteOpen(false)
      setDeletePhoto()
      window.location.assign(window.location.href)
    }).catch((e) => {
      console.error(e)
    })
  }

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        <div className="flex flex-col w-1/2 gap-y-2">
          <span className="text-lg font-semibold">Upload Photos</span>
          <div className="flex items-center gap-x-4">
            <ButtonSecondary><input multiple type="file" accept="image/*" onChange={filesSelected}/> </ButtonSecondary>
            { uploading && _renderLoading() }
          </div>
        </div>
        {/* <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 10
          </span>
        </div> */}

        {/* --------------------- */}
        <div className="listingSection__wrap ">
          <h2 className="text-2xl font-semibold">Edit Photos for { property.data && property.data.title}</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            { photos.isLoading &&
              <div>
                <div className="flex justify-center items-center container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
                  {/* HEADER */}
                  <header className="text-center max-w-2xl mx-auto space-y-2 my-16">
                    <ReactLoading type="spin" color="#F56600" height={'50vh'} width={'25vw'}/>
                  </header>
                </div>
              </div>
            }
            { photos.data &&
              photos.data.map((photo:any, i:number) => (
                <div className="flex items-center justify-between py-3">
                  <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
                    <img src={photo.url} width={'50%'}/>
                  </span>
                  <i onClick={handleXClick} className={`text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer photo-${i}`}></i>
                </div>
              ))
            }
          </div>
        </div>


        <div className="flex justify-end space-x-5">
          <ButtonSecondary onClick={() => window.location.assign(`${window.location.origin}/listing-detail/${params.id}`)}>Finish</ButtonSecondary>
        </div>
      </div>
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
                      Delete Image?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-neutral-900 dark:text-neutral-400">
                        Are you sure you want to delete this image?
                      </p>
                    </div>
                    <div className="mt-2">
                      { deletePhoto &&
                        <img src={deletePhoto.url} />
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteImage}
                >
                  {loading && _renderLoading()}
                  Delete Image
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

export default PageEditPhotos;
