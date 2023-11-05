"use client"
import {getStatistics} from "actions/dashboardActions";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/app/common/Loader";

export default () => {
  const {data: stats, isPending} = useQuery({queryKey: ["statistics"], queryFn: getStatistics});
  return <section className="p-4 my-6 w-full h-fit md:p-8 dark:bg-gray-800 dark:text-gray-100">
    {isPending ? <Loader/> :
    <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-2">
      <div className="flex overflow-hidden rounded-lg dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-center px-4 dark:bg-violet-400 dark:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
            <path d="M256.25,16A240,240,0,0,0,88,84.977V16H56V144H184V112H106.287A208,208,0,0,1,256.25,48C370.8,48,464,141.2,464,255.75S370.8,463.5,256.25,463.5,48.5,370.3,48.5,255.75h-32A239.75,239.75,0,0,0,425.779,425.279,239.75,239.75,0,0,0,256.25,16Z"></path>
            <polygon points="240 111.951 239.465 288 368 288 368 256 271.563 256 272 112.049 240 111.951"></polygon>
          </svg>
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <p className="text-2xl font-semibold">{stats.totalHashRate}</p>
          <p>Total Hash Rate</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-center px-4 dark:bg-violet-400 dark:text-gray-800">
          <svg fill="#000000" className={"w-6 h-6 icon flat-color"} viewBox="0 0 15.36 15.36" id="bitcoin" data-name="Flat Color"
               xmlns="http://www.w3.org/2000/svg">
            <path id="primary"
                  d="M12.16 9.92a2.874 2.874 0 0 0 -1.453 -2.483A2.861 2.861 0 0 0 9.6 2.739V1.92a0.64 0.64 0 0 0 -1.28 0v0.64h-1.28V1.92a0.64 0.64 0 0 0 -1.28 0v0.64H3.84a0.64 0.64 0 0 0 0 1.28h0.64v7.68H3.84a0.64 0.64 0 0 0 0 1.28h1.92v0.64a0.64 0.64 0 0 0 1.28 0v-0.64h1.28v0.64a0.64 0.64 0 0 0 1.28 0v-0.64a2.874 2.874 0 0 0 2.56 -2.88ZM8.64 3.84a1.6 1.6 0 0 1 0 3.2H5.76V3.84Zm0.64 7.68H5.76v-3.2h3.52a1.6 1.6 0 0 1 0 3.2Z"
                  style={{fill: "rgb(0, 0, 0);"}}/>
          </svg>
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <p className="text-2xl font-semibold">{stats.bitcoinPrice}</p>
          <p>Bitcoin Price (USD)</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-center px-4 dark:bg-violet-400 dark:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
            <path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
            <path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
          </svg>
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <p className="text-2xl font-semibold">{stats.activeMiners}</p>
          <p>Active Miners</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-center px-4 dark:bg-violet-400 dark:text-gray-800">
          <svg className={"w-6 h-6"} width="512px" height="512px" viewBox="-112 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"/></svg>
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <p className="text-2xl font-semibold">{stats.miningRevenue}</p>
          <p>Mining Revenue (USD)</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-center px-4 dark:bg-violet-400 dark:text-gray-800">
          <svg className={"w-6 h-6"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32"><g><path d="M27.313 4.686C24.292 1.664 20.273 0 16 0c-4.274 0 -8.292 1.664 -11.314 4.686C1.664 7.708 0 11.726 0 16c0 4.274 1.664 8.292 4.686 11.314 3.022 3.022 7.04 4.686 11.314 4.686 4.274 0 8.292 -1.664 11.314 -4.686 3.022 -3.022 4.686 -7.04 4.686 -11.314 0 -4.274 -1.665 -8.292 -4.687 -11.314zM25.794 16c0 5.4 -4.394 9.794 -9.794 9.794S6.206 21.4 6.206 16 10.6 6.206 16 6.206 25.794 10.6 25.794 16zm0.491 -10.285a14.817 14.817 0 0 1 0.77 0.832l-2.345 2.345c-2.064 -2.525 -5.202 -4.139 -8.71 -4.139 -0.368 0 -0.732 0.018 -1.091 0.053V1.495c0.361 -0.027 0.725 -0.04 1.091 -0.04 3.885 0 7.538 1.513 10.285 4.26z"/></g></svg>
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <p className="text-2xl font-semibold">{stats.miningDifficulty}</p>
          <p>Mining Difficulty</p>
        </div>
      </div>
    </div>
    }
  </section>
}