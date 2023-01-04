import { SetStateAction, useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import StakingIcon from "../styles/icons/StakingIcon";
import HomeIcon from "../styles/icons/HomeIcon";
import AuctionsIcon from "../styles/icons/AuctionsIcon";
import RafflesIcon from "../styles/icons/RafflesIcon";
import CoinflipIcon from "../styles/icons/CoinflipIcon";
import RoyaltiesIcon from "../styles/icons/RoyaltiesIcon";

import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@nextui-org/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { publicKey } = useWallet();
  var truncate = function (
    fullStr: string,
    strLen: number,
    separator: string | any[]
  ) {
    //@ts-ignore
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };

  const navigation = [
    {
      name: "Home",
      href: "https://www.toolidarity.app/",
      icon: HomeIcon,
      active: router.pathname == "https://www.toolidarity.app/" ? true : false,
    },
    {
      name: "Staking",
      href: "https://soleddarity-utilities.vercel.app/staking",
      icon: StakingIcon,
      active: router.pathname == "https://soleddarity-utilities.vercel.app/staking" ? true : false,
    },
    {
      name: "Auctions",
      href: "https://soleddarity-utilities.vercel.app/auctions",
      icon: AuctionsIcon,
      active: router.pathname == "https://soleddarity-utilities.vercel.app/auctions" ? true : false,
    },
    {
      name: "Raffles",
      href: "https://soleddarity-utilities.vercel.app/raffles",
      icon: RafflesIcon,
      active: router.pathname == "https://soleddarity-utilities.vercel.app/raffles" ? true : false,
    },
    {
      name: "Coinflip",
      href: "https://soleddarity-coinflip.vercel.app/",
      icon: CoinflipIcon,
      active: router.pathname == "https://soleddarity-coinflip.vercel.app/" ? true : false,
    },
    {
      name: "Royalties",
      href: "https://tools.builderz.build/pay-royalties",
      icon: RoyaltiesIcon,
      active: router.pathname == "https://tools.builderz.build/pay-royalties" ? true : false,
    },
  ];

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event: { target: { files: any[] } }) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      //@ts-ignore
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    //@ts-ignore
    console.log(image?.name);

    //@ts-ignore
    body.append("file", image);
    //@ts-ignore
    updateNickname(image?.name);

    //@ts-ignore
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  const login = async () => {
    axios
      .post("http://localhost:3030/api/auth/login", {
        publicKey: publicKey,
      })
      .then((response) => {
        setnickname(response.data.nickname);
        setpfp(response.data.pfp);
        setCookie("jwt", response.data.token);
      })
      .catch(function () {
        signup();
      });
  };

  const signup = async () => {
    axios
      .post("http://localhost:3030/api/auth/signup", {
        publicKey: publicKey,
        nickname: publicKey,
        pfp: "default.png",
      })
      .then((response) => {
        setCookie("jwt", response.data.token);
      })
      .catch(function () {
        console.log("error");
      });
  };
      )
      .then(() => {
        setOpen(false);
        toast.success("Updated Successfully!");
      })
      .catch(function () {
        console.log("error");
      });
  };

  useEffect(() => {
    login();
  }, [publicKey]);

  return (
    <>
      <div className="flex h-screen bg-[#14171F] text-white">
        <Toaster position="bottom-center" reverseOrder={false} />
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#14171F] border-[#1F2029] border-r-2 focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-4">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>X
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Link href="https://toolidarity.app">
                        <img
                          className="h-auto w-auto"
                          src={`${router.basePath}/assets/images/logo.png`}
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <nav aria-label="Sidebar" className="mt-5 ml-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md p-2 text-base font-medium text-gray-600 hover:opacity-50 "
                          >
                            <item.icon
                              // className="h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-[#1F2029] p-4">
                    <a className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={
                              createObjectURL
                                ? createObjectURL
                                : `${router.basePath}/uploads/${pfp}`
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#14181F] bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#14181F] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-[#14181F] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <label
                          className="mx-auto block w-[150px] rounded-full"
                          htmlFor="myImage"
                        >
                          <div className="relative">
                            <img
                              onClick={() => setOpen(true)}
                              className="mx-auto block h-[100px] w-[100px] rounded-full border-opacity-40 border-[#1CE9C6] border-[5px] hover:opacity-80"
                              src={
                                createObjectURL
                                  ? createObjectURL
                                  : `${router.basePath}/uploads/${pfp}`
                              }
                              alt=""
                            />
                            <div className="bg-[#1CE9C6] p-1  bg-opacity-[70%] absolute right-2  bottom-0 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 text-white "
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                                />
                              </svg>
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          name="myImage"
                          id="myImage"
                          //@ts-ignore
                          onChange={uploadToClient}
                          hidden
                        />
                        <div className="mt-3 flex flex-col gap-5 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-100"
                          >
                            Hi{" "}
                            {truncate(
                              nickname ? nickname : "Put a nickname",
                              20,
                              "..."
                            )}
                          </Dialog.Title>
                          <div className="mt-2 w-full">
                            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-[#1CE9C6] focus-within:ring-1 focus-within:ring-[#1CE9C6]">
                              <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 -mt-px inline-block bg-[#14181F] px-1 text-xs font-medium text-gray-100"
                              >
                                Change nickname
                              </label>
                              <input
                                //@ts-ignore
                                onChange={handleNickname}
                                value={truncate(
                                  nickname ? nickname : "",
                                  20,
                                  "..."
                                )}
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full border-0 p-0 bg-[#14181F] text-gray-100 placeholder-gray-100 focus:ring-0 sm:text-sm"
                                placeholder="Jane Smith"
                                autoComplete="off"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#14171F] border-[#1F2029] border-t-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#1CE9C6] bg-opacity-[30%] hover:bg-opacity-[14%]  border-[#1CE9C6] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#1CE9C6] focus:outline-none focus:ring-2  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        type="submit"
                        onClick={nickname ? uploadToServer : () => null}
                      >
                        {nickname ? "save" : "Please, put a nickname"}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border bg-opacity-[14%] text-white border-gray-300 bg-white px-4 py-2 text-base font-medium shadow-sm  focus:outline-none focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-20 flex-col">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#14171F] border-[#1F2029] border-r-2">
              <div className="flex-1 flex flex-col items-center gap-28">
                <div>
                  <div className="flex items-center justify-center  py-4">
                    <Link href="/">
                      <img
                        className="h-12 w-auto"
                        src={`${router.basePath}/assets/images/logo.png`}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  {/* <div className="flex flex-shrink-0 pb-5">
                    <a className="w-full relative flex-shrink-0 flex items-center justify-center flex-col">
                      <img
                        onClick={() => setOpen(true)}
                        className="mx-auto block h-10 w-10 rounded-full"
                        src={
                          createObjectURL
                            ? createObjectURL
                            : `${router.basePath}/uploads/${pfp}`
                        }
                        alt=""
                      />
                     
                      <div className="sr-only"></div>
                    </a>
                  </div> */}
                </div>
                <nav
                  aria-label="Sidebar"
                  className="flex flex-col items-center  space-y-5 py-10"
                >
                  {navigation.map((item) => (
                    <Tooltip
                      rounded
                      content={item.name}
                      color="invert"
                      placement="right"
                      className=""
                    >
                      <Link key={item.name} href={item.href}>
                        <div
                          className={
                            item.active
                              ? "flex items-center  p-4 text-[#1CE9C6] hover:opacity-80 border-l-2 border-[#1CE9C6] ml-[-15px]"
                              : "flex items-center  p-4 text-white hover:opacity-80 ml-[-15px]"
                          }
                        >
                          <item.icon aria-hidden="true" />
                          <span className="sr-only">{item.name}</span>
                        </div>
                      </Link>
                    </Tooltip>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-[#14171F] border-[#1F2029] border-b-2 py-2 px-4 sm:px-6 lg:px-8">
              <div>
                <Link href="/">
                  <img
                    className="h-8 w-auto"
                    src={`${router.basePath}/assets/images/logo.png`}
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <main className="flex flex-1 overflow-hidden">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Account
              </h1>
              <div className="p-10">{children}</div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
