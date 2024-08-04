import landingImage from '../assets/landing.png'
import appDownloadImage from '../assets/appDownload.png'
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div 
      className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
        Feast in a Flash 
        </h1>
        <span className="text-xl">Satisfy Your Cravings in No Time</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage}  alt="landing" />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
            <span className='font-bold text-3xl tracking-tighter'>
                Order takeaway even faster!
            </span>
            <span>
            Order Faster and Smarter with the Eats App!
            </span>
            <img src={appDownloadImage} width={300} className='object-contain' />
        </div>
      </div>
    </div>
  )
}

export default HomePage;
