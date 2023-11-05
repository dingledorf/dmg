"use client"

import {useQuery} from "@tanstack/react-query";
import {getStatistics} from "actions/dashboardActions";
import {useMemo} from "react";
import {calculateExpectedBitcoin, calculateHashrateToWin, TERAHASH_TO_WIN} from "helpers/analysis";
import Loader from "@/app/common/Loader";

const tenDaysInSeconds = 60 * 60 * 24 * 10;

export default () => {
  const {data: stats, isPending} = useQuery({queryKey: ["statistics"], queryFn: getStatistics});
  const averageHashRate = stats?.totalHashRate / stats?.activeMiners;
  const hashesInTenDays = useMemo(() => Math.round(averageHashRate * tenDaysInSeconds), [averageHashRate]);
  const expectedBitcoinInTenDays = useMemo(() => calculateExpectedBitcoin(averageHashRate, tenDaysInSeconds), [averageHashRate])
  const expectedTopMinerTenDayYield = useMemo(() => Math.round(calculateExpectedBitcoin(parseFloat(stats?.topMiner?.hashRate), tenDaysInSeconds) / expectedBitcoinInTenDays * 100), [stats?.topMiner?.hashRate, expectedBitcoinInTenDays])
  const hashrateToWin = calculateHashrateToWin(tenDaysInSeconds);

  return <div className="container h-fit p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
    {isPending ? <Loader/> : (
        <section className="p-6 my-6 dark:bg-gray-800 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leadi">Hardware Analysis Per Machine</h2>
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg className="mt-2 h-9 w-9 dark:text-gray-800" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32"><g><g><path d="M3.658 32h16.535V0H3.658v32zm8.268 -2.855c-1.117 0 -2.022 -0.905 -2.022 -2.022 0 -1.117 0.905 -2.022 2.022 -2.022s2.022 0.905 2.022 2.022c0 1.117 -0.905 2.022 -2.022 2.022zm0 -7.138c-1.117 0 -2.022 -0.905 -2.022 -2.022 0 -1.117 0.905 -2.022 2.022 -2.022s2.022 0.905 2.022 2.022c0 1.117 -0.905 2.022 -2.022 2.022zM5.294 1.755h13.264v6.126H5.294V1.755zm0 7.554h13.264v6.126H5.294v-6.126z"/><path points="433.826,462.507 433.826,81.939 328.214,0 328.214,489.82 		" d="M28.342 30.216L28.342 5.353L21.442 0L21.442 32Z"/><path x="94.686" y="40.516" width="175.714" height="66.462" d="M6.186 2.647H17.665V6.989H6.186V2.647z"/><path x="94.686" y="156.142" width="175.714" height="66.461" d="M6.186 10.201H17.665V14.543H6.186V10.201z"/></g></g></svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className={`text-3xl font-semibold leadi ${hashesInTenDays >= TERAHASH_TO_WIN ? 'dark:text-green-400' : 'dark:text-red-400'}`}>{hashesInTenDays}</p>
                <p className="capitalize">Expected 10 Day Hash Completion</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg fill="#000000" className={"mt-2 h-9 w-9 dark:text-gray-800"} viewBox="0 0 15.36 15.36" id="bitcoin" data-name="Flat Color"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="primary"
                        d="M12.16 9.92a2.874 2.874 0 0 0 -1.453 -2.483A2.861 2.861 0 0 0 9.6 2.739V1.92a0.64 0.64 0 0 0 -1.28 0v0.64h-1.28V1.92a0.64 0.64 0 0 0 -1.28 0v0.64H3.84a0.64 0.64 0 0 0 0 1.28h0.64v7.68H3.84a0.64 0.64 0 0 0 0 1.28h1.92v0.64a0.64 0.64 0 0 0 1.28 0v-0.64h1.28v0.64a0.64 0.64 0 0 0 1.28 0v-0.64a2.874 2.874 0 0 0 2.56 -2.88ZM8.64 3.84a1.6 1.6 0 0 1 0 3.2H5.76V3.84Zm0.64 7.68H5.76v-3.2h3.52a1.6 1.6 0 0 1 0 3.2Z"
                        style={{fill: "rgb(0, 0, 0);"}}/>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className={`text-3xl font-semibold leadi ${expectedBitcoinInTenDays >= 1 ? 'dark:text-green-400' : 'dark:text-red-400'}`}>{expectedBitcoinInTenDays.toFixed(6)}</p>
                <p className="capitalize">Expected 10 Day Bitcoin Winnings</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg className={"mt-2 h-9 w-9 dark:text-gray-800"} width="32px" height="32px" viewBox="0 0 0.64 0.64" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#444" d="M0 0.6h0.64v0.04H0v-0.04z"/><path fill="#444" d="M0 0h0.04v0.64H0V0z"/><path fill="#444" d="M0.36 0.32 0.244 0.2 0.08 0.36v0.2h0.56V0.036z"/></svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className={`text-3xl font-semibold leadi ${expectedTopMinerTenDayYield >= 100 ? 'dark:text-green-400' : 'dark:text-red-400'}`}>{expectedTopMinerTenDayYield}%</p>
                <p className="capitalize">Top Miner Expected Yield</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="mt-2 h-9 w-9 dark:text-gray-800">
                  <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leadi">{hashrateToWin.toFixed(6)}</p>
                <p className="capitalize">Expected 10 Day Hashrate For Win</p>
              </div>
            </div>
          </div>
        </section>)}
  </div>
}