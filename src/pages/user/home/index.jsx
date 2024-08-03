import React, { lazy , Suspense } from 'react';
import Loading from '../../../components/user/loading';
import Slider from '../../../components/user/slider';
const Products = lazy(() => import('../../../components/user/products'));
function Home() {
  

  return (
    <>
    <Slider />
<Suspense fallback = {<Loading />}>

 <Products />
</Suspense>
    
    </>
   
  )
}

export default Home