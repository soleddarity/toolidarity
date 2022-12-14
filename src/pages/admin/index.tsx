import { SetStateAction, useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  CurrencyDollarIcon,
  HomeIcon,
  LibraryIcon,
  TagIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@nextui-org/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { default as ReactSelect } from "react-select";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { publicKey } = useWallet();
  const [nickname, setnickname] = useState<any>(publicKey?.toBase58());
  const [categoryName, setcategoryName] = useState<any>();
  const [categorys, setcategorys] = useState();
  const [pfp, setpfp] = useState("default.png");
  const [color, setColor] = useColor("hex", "#121212");

  const [name, setname] = useState<any>();
  const [description, setdescription] = useState<any>();
  const [icon, seticon] = useState<any>();
  const [twitter, settwitter] = useState<any>();
  const [discord, setdiscord] = useState<any>();
  const [website, setwebsite] = useState<any>();

  const [from, setfrom] = useColor("hex", "#121212");
  const [to, setto] = useColor("hex", "#121212");

  const handlewebsite = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setwebsite(event.target.value);
  };

  const handlediscord = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setdiscord(event.target.value);
  };

  const handletwitter = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    settwitter(event.target.value);
  };

  const handleicon = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    seticon(event.target.value);
  };

  const handledescription = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setdescription(event.target.value);
  };

  const handlename = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setname(event.target.value);
  };

  const handleNickname = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setnickname(event.target.value);
  };

  const handlecategoryName = (event: {
    target: { value: SetStateAction<undefined> };
  }) => {
    setcategoryName(event.target.value);
  };

  const cancelButtonRef = useRef(null);

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
      href: "/",
      icon: HomeIcon,
      active: router.pathname == "/" ? true : false,
    },
    {
      name: "Staking",
      href: "/staking",
      icon: LibraryIcon,
      active: router.pathname == "/staking" ? true : false,
    },
    {
      name: "Auctions",
      href: "auctions",
      icon: CurrencyDollarIcon,
      active: router.pathname == "/auctions" ? true : false,
    },
    {
      name: "Raffles",
      href: "/raffles",
      icon: TagIcon,
      active: router.pathname == "/raffles" ? true : false,
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

  const updateNickname = async (pfp: any) => {
    axios
      .post("http://localhost:3030/api/auth/updatenickname", {
        publicKey: publicKey,
        nickname: nickname,
        pfp: pfp ? pfp : "",
      })
      .then(() => {
        setOpen(false);
        toast.success("Updated Successfully!");
      })
      .catch(function () {
        console.log("error");
      });
  };

  const addCategory = async () => {
    axios
      .post("http://localhost:3030/api/auth/createCategory", {
        categoryName: categoryName,
        categoryColor: color.hex,
      })
      .then(() => {
        toast.success("Category added Successfully!");
        getCategorys();
      })
      .catch(function () {
        console.log("error");
      });
  };

  const addTool = async () => {
    axios
      .post("http://localhost:3030/api/auth/createTool", {
        name: name,
        description: description,
        twitter: twitter,
        discord: discord,
        website: website,
        category: JSON.stringify(optionSelected),
        icon: icon,
        from: from.hex,
        to: to.hex,
        type: selected?.name,
      })
      .then(() => {
        toast.success("Category added Successfully!");
        getCategorys();
      })
      .catch(function () {
        console.log("error");
      });
  };

  const getCategorys = async () => {
    axios
      .get("http://localhost:3030/api/auth/getCategorys")
      .then((response) => {
        setcategorys(response.data);
      })
      .catch(function () {
        console.log("error");
      });
  };

  const colourOptions = [
    { value: "marketplace", label: "Marketplace" },
    { value: "aggregator", label: "Aggregator" },
    { value: "dex", label: "DEX" },
    { value: "tokenmarket", label: "Token Market" },
    { value: "OTC", label: "OTC" },
    { value: "P2P", label: "P2P" },
    { value: "UtilityTools", label: "Utility Tools" },
    { value: "PortfolioTracker", label: "Portfolio Tracker" },
    { value: "AlphaCalls", label: "Alpha Calls" },
    { value: "SpyWallets", label: "Spy Wallets" },
    { value: "SniperBot", label: "Sniper Bot" },
  ];

  const people = [
    { id: 1, name: "Free Tools" },
    { id: 2, name: "Unlocked tools" },
    { id: 3, name: "Discounts" },
  ];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const [optionSelected, setoptionSelected] = useState<any>();
  const [selected, setSelected] = useState(people[3]);

  const handleChange = (selected: any) => {
    setoptionSelected(selected);
    console.log(optionSelected);
  };

  useEffect(() => {
    login();
    getCategorys();
  }, [publicKey]);

  useEffect(() => {
    getCategorys();
  }, []);

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
                      <Link href="/">
                        <img
                          className="h-auto w-auto"
                          src={`${router.basePath}/assets/images/logo.png`}
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md p-2 text-base font-medium text-gray-600 hover:opacity-50 "
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
                  <div className="flex flex-shrink-0 pb-5">
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
                      <div className="bg-white absolute top-[30px] text-xs text-black w-6 h-6 items-center justify-center rounded-full flex">
                        1
                      </div>
                      <div className="mt-6 w-full rounded-full h-2 bg-[#373E52] relative">
                        <div className="w-[20%] rounded-full h-2 bg-[#fff] absolute top-0 bottom-0"></div>
                      </div>
                      <div className="sr-only"></div>
                    </a>
                  </div>
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
                          <item.icon className="h-6 w-6" aria-hidden="true" />
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
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <div className="p-10 flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-white">
                  Admin panel
                </h1>
                <div className="flex items-center gap-3">
                  <WalletMultiButton></WalletMultiButton>
                </div>
              </div>
              <div className="px-10 flex flex-col gap-5">
                <div className="overflow-hidden bg-gray-900 border border-gray-800 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-100">
                        Create new category
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-200">
                        Add more category if needed.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-100 mb-2">
                        Current Categorys
                      </h3>
                      <div className="items-center gap-2 flex">
                        {
                          //@ts-ignore
                          categorys?.map(function (cat: any, idx: any) {
                            return (
                              <>
                                <div
                                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium"
                                  style={{
                                    background: cat.categoryColor,
                                  }}
                                >
                                  {cat.categoryName}
                                </div>
                              </>
                            );
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-800">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Category name
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              Email
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handlecategoryName}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder="Marketplace"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Category Color
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <ColorPicker
                              width={350}
                              height={50}
                              color={color}
                              onChange={setColor}
                              hideRGB={true}
                              hideHSV
                              dark
                            />
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                  <div className="flex items-start justify-end w-full border-t border-gray-800 p-5">
                    {categoryName ? (
                      <>
                        <button
                          onClick={() => addCategory()}
                          type="button"
                          className="inline-flex float-right items-center rounded-md border border-transparent bg-blue-600 px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Add
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex cursor-not-allowed opacity-50 float-right items-center rounded-md border border-transparent bg-blue-600 px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Add
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden bg-gray-900 border border-gray-800 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-100">
                        Create new tool
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-200">
                        Add a new tool.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-800">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Name
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              Name
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handlename}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder="Marketplace"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Description
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              Description
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handledescription}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Twitter
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              Twitter
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handletwitter}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Discord
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              Discord
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handlediscord}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          website
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              website
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handlewebsite}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Icon link
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              website
                            </label>
                            <input
                              //@ts-ignore
                              onChange={handleicon}
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full text-white rounded-md bg-gray-900 border-gray-800 shadow-sm sm:text-sm"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          category
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <label htmlFor="email" className="sr-only">
                              category
                            </label>
                            <span
                              className="d-inline-block"
                              data-toggle="popover"
                              data-trigger="focus"
                              data-content="Please selecet account(s)"
                            >
                              <ReactSelect
                                options={colourOptions}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                //@ts-ignore
                                components={
                                  <>
                                    {
                                      //@ts-ignore
                                      <Option></Option>
                                    }
                                  </>
                                }
                                onChange={handleChange}
                                allowSelectAll={true}
                                value={optionSelected}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          Type
                        </dt>
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-800 bg-gray-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">
                                    {selected?.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          From
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <ColorPicker
                              width={350}
                              height={50}
                              color={from}
                              onChange={setfrom}
                              hideRGB={true}
                              hideHSV
                              dark
                            />
                          </div>
                        </div>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-200">
                          To
                        </dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <div className="items-center">
                            <ColorPicker
                              width={350}
                              height={50}
                              color={to}
                              onChange={setto}
                              hideRGB={true}
                              hideHSV
                              dark
                            />
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                  <div className="flex items-start justify-end w-full border-t border-gray-800 p-5">
                    {name &&
                    description &&
                    twitter &&
                    discord &&
                    website &&
                    from &&
                    to ? (
                      <>
                        <button
                          onClick={() => addTool()}
                          type="button"
                          className="inline-flex float-right items-center rounded-md border border-transparent bg-blue-600 px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Add tool
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex cursor-not-allowed opacity-50 float-right items-center rounded-md border border-transparent bg-blue-600 px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Add tool
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
