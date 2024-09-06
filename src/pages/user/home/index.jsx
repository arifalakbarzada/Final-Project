import React, { lazy, Suspense } from 'react';
import Loading from '../../../components/loading';
const Products = lazy(() => import('../../../components/products'));
function Home() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div>
          <Products />
        </div>
      </Suspense>

    </>

  )
}

export default Home