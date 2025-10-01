// import React from 'react';
// import hero from "./assets/hero.jpg";
// import { useTranslation } from "react-i18next";

// function Home() {
//   const { t } = useTranslation();

//   return (
//     <div>
//       {/* ===============================Hero section========================== */}
//       <section>
//         <div
//           className="relative h-screen bg-cover bg-center"
//           style={{ backgroundImage: `url(${hero})` }}
//         >
//           <div className="absolute inset-0 bg-white opacity-65"></div>
//           <section className="relative z-10 flex justify-evenly ">
//             <div className="py-10 px-16">
//               <h2 className="flex p-3 bg-yellow-200 rounded-3xl w-64 text-yellow-600 ">
//                 <span className="material-symbols-outlined">nest_eco_leaf</span>
//                 {t("Smart Agriculture Revolution")}
//               </h2>
//               <h1 className="py-7 text-4xl">
//                 {t("Grow Smarter with AI-Powered Farming")}
//               </h1>
//               <p className="py-7 text-xl w-96">
//                 {t(
//                   "Transform your agricultural practices with intelligent insights, real-time market data, and a supportive farming community. Technology that grows with you."
//                 )}
//               </p>
//               <article className="flex space-x-3">
//                 <button className="flex bg-yellow-500 p-3 rounded-xl hover:bg-yellow-400">
//                   {t("Start Growing Smarter")}
//                   <span className="material-symbols-outlined">arrow_right_alt</span>
//                 </button>
//                 <button
//                   className="flex bg-white border-green p-3 rounded-md"
//                   style={{ border: "2px solid green" }}
//                 >
//                   <span className="material-symbols-outlined">play_arrow</span>
//                   {t("Watch Demo")}
//                 </button>
//               </article>
//               <article className="flex py-8 justify-between">
//                 <section className="px-1">
//                   <h1 className="text-[#eebd35] text-4xl px-1"><b>50K+</b></h1>
//                   <p className="text-[#3f3e3c]">{t("Active Farmers")}</p>
//                 </section>
//                 <section className="px-1">
//                   <h1 className="text-[#eebd35] text-4xl px-1"><b>25%</b></h1>
//                   <p className="text-[#3f3e3c]">{t("Avg.Yield increases")}</p>
//                 </section>
//                 <section>
//                   <h1 className="text-[#eebd35] text-4xl  px-1"><b>95%</b></h1>
//                   <p className="text-[#3f3e3c]">{t("Satisfaction Rate")}</p>
//                 </section>
//               </article>
//             </div>

//             <div className="py-36 px-10">
//               <article className="bg-white rounded-md items-center justify-center p-2 flex shadow-7xl ">
//                 <section>
//                   <img src="" alt="" />
//                 </section>
//                 <section>
//                   <h3>{t("AI-Powered Insights")}</h3>
//                   <p>{t("Smart recommendations tailored to your crops")}</p>
//                 </section>
//               </article>
//               <br />
//               <article className="bg-white rounded-md items-center justify-center w-96 p-2 flex shadow-7xl">
//                 <section>
//                   <img src="" alt="" />
//                 </section>
//                 <section>
//                   <h3>{t("Disease Detection")}</h3>
//                   <p>{t("Early identification and treatment suggestions")}</p>
//                 </section>
//               </article>
//               <br />
//               <article className="bg-white rounded-md items-center justify-center w-96 p-2 flex shadow-7xl">
//                 <section>
//                   <img src="" alt="" />
//                 </section>
//                 <section>
//                   <h3>{t("Market Intelligence")}</h3>
//                   <p>{t("Real-time prices and profit optimization")}</p>
//                 </section>
//               </article>
//             </div>
//           </section>
//         </div>
//       </section>

//       {/* ==================================== rating =========================== */}
//       <div className="bg-[#fff9eb]">
//         <article className="p-3 flex flex-col items-center">
//           <h1 className="justify-center text-4xl text-[#0f3300] py-10">
//             <b>{t("Trusted by Farmers Across India")}</b>
//           </h1>
//           <h3>
//             {t(
//               "See how FarmWise AI is helping farmers increase yields and reduce risks"
//             )}
//           </h3>
//         </article>
//         <article>
//           <section></section>
//           <section></section>
//           <section></section>
//         </article>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import hero from "./assets/hero.jpg";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* ===============================Hero section========================== */}
      <section>
        <div
          className="relative h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-white opacity-65"></div>
          <section className="relative z-10 flex flex-col lg:flex-row justify-evenly items-center lg:items-start h-auto   ">
            
            {/* Left content */}
            <div className="py-10 px-8 lg:px-16 w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="inline-flex items-center justify-center lg:justify-start p-3 bg-yellow-200 rounded-3xl text-yellow-600 mb-4">
                <span className="material-symbols-outlined mr-2">nest_eco_leaf</span>
                {t("Smart Agriculture Revolution")}
              </h2>
              <h1 className="py-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
                {t("Grow Smarter with AI-Powered Farming")}
              </h1>
              <p className="py-4 text-lg sm:text-xl lg:w-96 mx-auto lg:mx-0">
                {t(
                  "Transform your agricultural practices with intelligent insights, real-time market data, and a supportive farming community. Technology that grows with you."
                )}
              </p>
              <article className="flex space-x-3 flex-wrap justify-center lg:justify-start">
                <button className="flex bg-yellow-500 p-3 rounded-xl hover:bg-yellow-400 items-center">
                  {t("Start Growing Smarter")}
                  <span className="material-symbols-outlined ml-2">arrow_right_alt</span>
                </button>
                <button
                  className="flex bg-white border-2 border-green-500 p-3 rounded-md items-center mt-2 lg:mt-0"
                >
                  <span className="material-symbols-outlined mr-2">play_arrow</span>
                  {t("Watch Demo")}
                </button>
              </article>
              <article className="flex py-8 justify-between flex-wrap text-center lg:text-left">
                <section className="px-2 py-2 w-1/3 sm:w-auto">
                  <h1 className="text-[#eebd35] text-3xl sm:text-4xl"><b>50K+</b></h1>
                  <p className="text-[#3f3e3c]">{t("Active Farmers")}</p>
                </section>
                <section className="px-2 py-2 w-1/3 sm:w-auto">
                  <h1 className="text-[#eebd35] text-3xl sm:text-4xl"><b>25%</b></h1>
                  <p className="text-[#3f3e3c]">{t("Avg.Yield increases")}</p>
                </section>
                <section className="px-2 py-2 w-1/3 sm:w-auto">
                  <h1 className="text-[#eebd35] text-3xl sm:text-4xl"><b>95%</b></h1>
                  <p className="text-[#3f3e3c]">{t("Satisfaction Rate")}</p>
                </section>
              </article>
            </div>

            {/* Right content: 3 cards */}
            <div className="py-28 px-8 lg:px-10 w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
              {[{
                title: "AI-Powered Insights",
                desc: "Smart recommendations tailored to your crops",
              },{
                title: "Disease Detection",
                desc: "Early identification and treatment suggestions",
              },{
                title: "Market Intelligence",
                desc: "Real-time prices and profit optimization",
              }].map((card, idx) => (
                <article key={idx} className="bg-white rounded-md p-4 flex items-center shadow-2xl w-full">
                  <section className="flex-shrink-0">
                    <img src="" alt="" className="w-12 h-12"/>
                  </section>
                  <section className="ml-4">
                    <h3 className="font-semibold">{t(card.title)}</h3>
                    <p className="text-sm">{t(card.desc)}</p>
                  </section>
                </article>
              ))}
            </div>

          </section>
        </div>
      </section>

      {/* ==================================== rating =========================== */}
      <div className="bg-[#fff9eb] sticky">
        <article className="p-3 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl text-[#0f3300] py-6 font-bold">
            {t("Trusted by Farmers Across India")}
          </h1>
          <h3 className="text-lg sm:text-xl">
            {t(
              "See how FarmWise AI is helping farmers increase yields and reduce risks"
            )}
          </h3>
        </article>
      </div>
    </div>
  );
}

export default Home;
