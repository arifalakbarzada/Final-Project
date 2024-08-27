import React, { lazy, Suspense } from 'react';
import Loading from '../../../components/loading';
import Slider from '../../../components/slider';
const Products = lazy(() => import('../../../components/products'));
function Home() {


  return (
    <>
      <Slider />
      <Suspense fallback={<Loading />}>
        <div>
          <Products />
        </div>
      </Suspense>

    </>

  )
}

export default Home