import type { NextPage } from 'next'
import HomeLayout from '../components/LandingPage/Layout'
import Header from '../components/shared/Header'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col items-center'>

      <Header />
    <div className="flex justify-center">
      <HomeLayout />
    </div>

    </div>
  )
}

export default Home
