import React from 'react'
// import './home.css';
import hero from "./assets/hero.jpg";
// style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}
function Home() {
  return (
    <div>
      {/* ===============================Hero section========================== */}
      <section>
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }}>
          <div className="absolute inset-0 bg-white opacity-65"></div>
          <section className="relative z-10 flex justify-evenly ">
            <div className="py-24 px-16">
              <h2 className="flex p-3 bg-yellow-200 rounded-3xl w-64 text-yellow-600 ">
                <span className="material-symbols-outlined">nest_eco_leaf</span>
                Smart Agriculture Revolution
              </h2>
              <h1 className="py-7 text-4xl">
                Grow Smarter <br /> with AI-Powered Farming
              </h1>
              <p className="py-7 text-xl " style={{width:'500px'}}>
                Transform your agricultural practices with intelligent insights, real-time market data,
                and a supportive farming community. Technology that grows with you.
              </p>
              <article className="flex space-x-3">
                <button className="flex bg-yellow-500 p-3 rounded-xl">
                  Start Growing Smarter
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </button>
                <button
                  className="flex bg-white border-green p-3 rounded-md"
                  style={{ border: "2px solid green" }}
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  Watch Demo
                </button>
              </article>
              <article className='flex py-8 justify-between'>
                <section className='px-1'>
                  <h1 className='text-[#eebd35] text-4xl px-1'><b>50K+</b></h1>
                  <p className='text-[#3f3e3c]'>Active Farmers</p>
                </section>
                <section className='px-1'>
                  <h1 className='text-[#eebd35] text-4xl px-1'><b>25%</b></h1>
                  <p className='text-[#3f3e3c]'>Avg.Yield increses</p>
                </section>
                <section>
                  <h1 className='text-[#eebd35] text-4xl  px-1'><b>95%</b></h1>
                  <p className='text-[#3f3e3c]'>Satisfaction Rate</p>
                </section>
              </article>
            </div>

            <div className="py-36 px-10">
              <article className="bg-white rounded-md items-center justify-center  p-2 flex shadow-7xl "style={{width:'400px'}}>
                <section>
                  <img src="" alt="img" />
                </section>
                <section>
                  <h3>AI-Powered Insights</h3>
                  <p>Smart recommendations tailored to your crops</p>
                </section>
              </article>
              <br />
              <article className="bg-white rounded-md items-center justify-center w-96 p-2 flex shadow-7xl" style={{width:'400px'}}>
                <section>
                  <img src="" alt="img" />
                </section>
                <section>
                  <h3>Disease Detection</h3>
                  <p>Early identification and treatment suggestions</p>
                </section>
              </article>
              <br />
              <article className="bg-white rounded-md items-center justify-center w-96 p-2 flex shadow-7xl" style={{width:'400px'}}>
                <section>
                  <img src="" alt="img" />
                </section>
                <section>
                  <h3>Market Intelligence</h3>
                  <p>Real-time prices and profit optimization</p>
                </section>
              </article>
            </div>
          </section>
        </div>
      </section>
      {/* ==================================== rating =========================== */}
      <div className='bg-[#fff9eb]'>
        <article className='p-3 flex flex-col items-center'>
          <h1 className='justify-center text-4xl text-[#0f3300] py-1'><b>Trusted by Farmers Across India</b></h1>
          <h3>See how FarmWise Al is helping farmers increase yields and reduce risks</h3>
        </article>
        <article>
          <section>

          </section>
          <section>

          </section>
          <section>
            
          </section>
        </article>
      </div>

    </div>
  )
}
export default Home
