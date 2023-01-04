// import { ECONNRESET } from 'constants';
import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

const SortableGrid = (props: any) => {
    const initData = props.tools.map(function (tool: any, idx: any) {
        return {
        _id: (idx + 1).toString(),
        content: tool,
    }});
        
    const gridRef = useRef(null);
    const sortableJsRef = useRef(null);
    
    let storage = localStorage.getItem(props.name);
    
    if (storage) {
        storage = JSON.parse(storage);
    }

    const [data, setData] = useState(storage || initData);
    const [filteredData, setFilteredData] = useState(storage || data);

    const onListChange = () => {
        const newData = [...gridRef.current.children]
        .map(i => i.dataset.id)
        .map(id => data.find(item => item._id === id));
        console.log(newData);
        localStorage.setItem(props.name, JSON.stringify(newData));
        setData(data);
    };

    useEffect(() => {
        sortableJsRef.current = new Sortable(gridRef.current, {
        animation: 150,
        filter: ".static",
        onEnd: onListChange,
        });

        let storageStr = localStorage.getItem(props.name) || '';
        let storage: any[] = [];

        if (storageStr) {
            storage = JSON.parse(storageStr);
        }

        const incoming = props.tools;
        
        let newItems = [];
        let removes: any[] = [];

        // remove items from storage
        if (storage.length > 0 && storage.length > incoming.length) {
            for (let i = 0; i < storage.length; i++) {
                let found = false;
                for (let k = 0; k < incoming.length; k++) {
                    if (storage[i].content.name === incoming[k].name) {
                        found = true;
                    }
                }

                if (!found) {
                    removes.push(storage[i].content.name);
                }
            }

            if (removes.length > 0) {
                newItems = storage.filter(item => {
                    if (removes.includes(item.content.name)) {
                        return false;
                    }

                    return true;
                })
            
                localStorage.setItem(props.name, JSON.stringify(newItems));
                setData(newItems);
            }        
        } 

        storageStr = localStorage.getItem(props.name) || '';
    
        if (storageStr) {
            storage = JSON.parse(storageStr);
        }

        // add new items to storage
        if (storage.length > 0 && incoming.length > storage.length) {
            for (let i = 0; i < incoming.length; i++) {
                let found = false;
                for (let k = 0; k < storage.length; k++) {
                    if (storage[k].content.name === incoming[i].name) {
                        found = true;
                    }
                }

                if (!found) {
                    storage.push({ _id: (i+1).toString(), content: incoming[i] });
                    localStorage.setItem(props.name, JSON.stringify(storage));
                    setData(storage);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (data && props.filter.length > 1) {
            let items = [...data];

            let newItems = items.filter((item) => {
              let categories = item.content.category.toLowerCase().split(",");
              
              const match = categories.find((element: any) => {
                if (element.toString().includes(props.filter)) {
                  return true;
                }
              });
              if (match) {
                return true;
              }
              
              if (item.content.name.toLowerCase().includes(props.filter)) {
                  return true;
              }
            }).filter(Boolean);

            setFilteredData(newItems);
          } else {
              setFilteredData(data);
          }
    }, [props.filter]);

    return (
        <div ref={gridRef} className="grid-box">
           {filteredData.map(({ _id, content }) => (
            <div key={_id} data-id={_id} className={props.filter.length > 1 ? "grid-square static" : "grid-square"} style={{
                background:
                  "linear-gradient(180deg, " +
                  content.from +
                  " 20%, " +
                  content.to +
                  " 100%)",
              }}>
                <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                    <div className="card-icon">
                        <img src={content.icon} className="rounded-xl w-14" />
                    </div>

                    <div className="flex overflow-scroll items-center gap-2">
                        {content.category.split(",").map(function (item: any) {
                        return (
                            <>
                            <span
                                className={
                                "inline-flex items-center rounded-full  px-2 py-0.5 text-xs font-medium " +
                                (item === "Marketplace"
                                    ? "text-white bg-[#FF2F2F]"
                                    : item === "Aggregator"
                                    ? "text-white bg-[#891CA6]"
                                    : item === "Portfolio Tracker"
                                    ? "text-white bg-[#49D949]"
                                    : item === "Utility Tools"
                                    ? "text-white bg-[#5E1BF9]"
                                    : item === "Wallet"
                                    ? "text-white bg-[#2C1B89]"
                                    : item === "Token Market"
                                    ? "text-white bg-[#2C1B89]"
                                    : item === "Burner"
                                    ? "text-white bg-[#920E2A]"
                                    : item === "AMM"
                                    ? "text-white bg-[#ECBA20]"
                                    : item === "Lend/Borrow"
                                    ? "text-white bg-[#0FB914]"
                                    : item === "WL Gestion"
                                    ? "text-white bg-[#272727]"
                                    : item === "Analytics"
                                    ? "text-white bg-[#E2CA00]"
                                    : item === "Inner Discord"
                                    ? "text-white bg-[#1B4BFF]"
                                    : item === "Repay Royalties"
                                    ? "text-white bg-[#3BE1DA]"
                                    : item === "P2P"
                                    ? "text-white bg-[#3C8CB9]"
                                    : item === "Sniper Bot"
                                    ? "text-white bg-[#686868]"
                                    : item === "Train-2-Earn"
                                    ? "text-white bg-[#D69A00]"
                                    : item === "Raid-2-Earn"
                                    ? "text-white bg-[#611C95]"
                                    : item === "Chat-2-Earn"
                                    ? "text-white bg-[#0D8899]"
                                    : item === "Engage-2-Earn"
                                    ? "text-white bg-[#A82B25]"
                                    : item === "NFT Renaming"
                                    ? "text-white bg-[#C9D11C]"
                                    : item === "Copy Trading"
                                    ? "text-white bg-[#F09447]"
                                    : item === "Alpha Calls"
                                    ? "text-white bg-[#EA460D]"
                                    : item === "WL Market"
                                    ? "text-white bg-[#363636]"
                                    : item === "Casino"
                                    ? "text-white bg-[#E855DB]"
                                    : item === "P2E"
                                    ? "text-white bg-[#40B64D]"
                                    : item === "Full Guide"
                                    ? "text-white bg-[#54B7CF]"
                                    : item === "SportsBook"
                                    ? "text-white bg-[#C09721]"
                                    : item === "Launchpad"
                                    ? "text-white bg-[#5CD86D]"
                                    : item === "OTC"
                                    ? "text-white bg-[#F29F22]"
                                    : "text-white bg-[#14181F]")
                                }
                            >
                                <svg
                                className="mr-1.5 h-2 w-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                                >
                                <circle cx={4} cy={4} r={3} />
                                </svg>
                                {item}
                            </span>
                            </>
                        );
                        })}
                    </div>
                    </div>

                    <div>
                        <h1 className="font-semibold text-xl">{content.name}</h1>
                        <p className="font-regular leading-5 text-sm">{content.description}</p>
                        <div className="mt-3 flex items-center gap-1.5">
                            <a
                            href={content.twitter}
                            target="_blank"
                            className="inline-flex cursor-pointer items-center  px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[#10A0E7] hover:opacity-80"
                            >
                            Twitter
                            </a>
                            <a
                            href={content.discord}
                            target="_blank"
                            className="inline-flex items-center   px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[#3D5AD8] hover:opacity-80"
                            >
                            Discord
                            </a>
                            <a
                            href={content.website}
                            target="_blank"
                            className="inline-flex items-center  px-2 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-[#31496A] bg-[#E6F6FE] hover:opacity-80"
                            >
                            Access
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      ))}
        </div>
    );
};

export default SortableGrid;