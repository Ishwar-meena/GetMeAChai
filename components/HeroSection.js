import Link from 'next/link';
import Image from 'next/image';
function HeroCard({ src }) {
  return <div className="box sm:my-10 my-5 gap-1 flex flex-col items-center">
    <div className="img bg-gray-500 p-2 rounded-full">
      <Image
        width={64}
        height={64}
        src={src}
        alt={src}
        className="h-16" />
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
          <h1 className="sm:text-5xl text-3xl font-medium my-3">Get Me A Chai</h1>
          <Image
            width={64}
            height={64}
            src="/tea.gif"
            alt="tea"
            className="sm:h-16 h-12 invert-75"
          />
        </div>
        <p className="px-6 sm:px-0 max-sm:text-center">a crowding funding platform for creators to fund their projects </p>
        <p className="px-6 sm:px-4 md:px-0 max-sm:text-center">A place where your fans can buy you a chai. Unleash the power of your fans and get your projects fund.</p>
        <div className="btn">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 cursor-pointer"><Link href={'/login'}>Start Here</Link></button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2 cursor-pointer mx-2">Read More</button>
        </div>
      </div>
      <div className="gray-line bg-gray-800 h-1"></div>
      <div>
        <div className="mt-8">
          <h2 className="text-2xl  text-center font-medium">Your fans can buy you a Chai</h2>
          <div className="boxes flex sm:flex-row flex-col items-center justify-around">
            <HeroCard
              src={"/man.gif"}
            />
            <HeroCard
              src={"/coin.gif"}
            />
            <HeroCard
              src={"/man.gif"}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
