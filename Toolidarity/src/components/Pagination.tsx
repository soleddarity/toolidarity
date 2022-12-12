import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Pagina() {
  return (
    <>
      <div className="flex items-center justify-between border-t border-[#2f3a47] bg-[#171E27] px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#090c10]"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#090c10]"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md border border-[#2f3a47] bg-[#171E27] px-2 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center border border-[#1CE9C6] border-opacity-60 bg-[#171E27]  px-4 py-2 text-sm font-medium text-[#1CE9C6] focus:z-20"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center borderborder-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center border border-[#2f3a47] bg-[#171E27] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md border border-[#2f3a47] bg-[#171E27] px-2 py-2 text-sm font-medium text-gray-500 hover:bg-[#090c10] focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
