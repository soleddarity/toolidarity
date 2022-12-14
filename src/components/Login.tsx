import {
  FireIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, active: false },
  { name: "Trending", href: "#", icon: FireIcon, active: false },
  { name: "Messages", href: "#", icon: InboxIcon, active: false },
  { name: "Profile", href: "#", icon: UserIcon, active: false },
];

export default function Login() {
  const router = useRouter();

  return (
    <>
      <div className="flex h-screen bg-[#14171F] text-white">
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-20 flex-col">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#14171F] border-[#1F2029] border-r-2">
              <div className="flex-1 flex flex-col items-center gap-28">
                <div>
                  <div className="flex items-center justify-center  py-4">
                    <img
                      className="h-12 w-auto"
                      src={`${router.basePath}/assets/images/logo.png`}
                      alt="Your Company"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-5 flex-shrink-0 pb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-center text-[#1CE9C6]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                </div>
                <nav
                  aria-label="Sidebar"
                  className="flex flex-col items-center  space-y-5 py-10"
                >
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={
                        item.active
                          ? "flex items-center  p-4 text-[#1CE9C6] hover:opacity-80 border-l-2 border-[#1CE9C6] ml-[-15px]"
                          : "flex items-center  p-4 text-white hover:opacity-80 ml-[-15px]"
                      }
                    >
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                    </a>
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
                <img
                  className="h-8 w-auto"
                  src={`${router.basePath}/assets/images/logo.png`}
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md  text-white hover:bg-[#1CE9C6] hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
              <div className="p-10 flex flex-col items-center justify-center w-full h-screen">
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="h-auto w-auto mb-5"
                    src={`${router.basePath}/assets/images/logo.png`}
                    alt="Your Company"
                  />
                  <h1 className="text-3xl xl:text-5xl text-center font-semibold leading-none">
                    Welcome to Toolidarity
                  </h1>
                  <p className="leading-none opacity-40">
                    Please connect your wallet to use the tool !
                  </p>
                  <div className="mt-5">
                    <WalletMultiButton></WalletMultiButton>
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
