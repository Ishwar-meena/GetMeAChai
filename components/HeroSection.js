function HeroCard(){
  return <div className="box my-10 gap-1 flex flex-col items-center">
                <div className="img bg-gray-500 p-2 rounded-full">
                  <img src="man.gif" alt="man" className="h-16" />
                </div>
                <h4 className="font-semibold">Fans want to help</h4>
                <p>Your fans are available to support you</p>
              </div>
}


const HeroSection = () => {
  return (
     <div className="hero-section">
        <div className="flex flex-col gap-2 h-96  justify-center items-center">
          <div className="flex items-center">
            <h1 className="text-5xl font-medium my-3">Get Me A Chai</h1>
            <img src="tea.gif" alt="tea" className="h-16 invert-75" />
          </div>
          <p className="">a crowding funding platform for creators to fund their projects </p>
          <p>A place where your fans can buy you a chai. Unleash the power of your fans and get your projects fund.</p>
          <div className="btn">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 cursor-pointer">Start Here</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 cursor-pointer mx-2">Read More</button>
          </div>
        </div>
        <div className="gray-line bg-gray-800 h-1"></div>
        <div>
          <div className="mt-8">
            <h2 className="text-2xl  text-center font-medium">Your fans can buy you a Chai</h2>
            <div className="boxes flex items-center justify-around">
              <HeroCard/>
              <HeroCard/>
              <HeroCard/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroSection
