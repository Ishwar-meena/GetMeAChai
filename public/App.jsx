import Navbar from "../components/Navbar"

function LoginCard({provider,img}){
  return <button className="provider cursor-pointer flex items-center justify-between gap-4 px-4 py-2 rounded-sm bg-white text-black">
            <img src={img} alt={img} className="h-6"/>
            <p className="text-lg font-medium ">Login with {provider}</p>
          </button>
}

function App() {

  return (
    <>
      <Navbar />
      <div className="loginform">
        <div className="box h-[80vh] flex flex-col gap-5 items-center justify-center">
         <LoginCard
            img={"google.png"}
            provider={"Google"}
         />
         <LoginCard
            img={"github.png"}
            provider={"GitHub"}
         />
        </div>
      </div>
    </>
  )
}

export default App
