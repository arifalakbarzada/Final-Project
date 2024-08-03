import React, { lazy , Suspense } from 'react';
import Loading from '../../../components/user/loading';
// import Products from '../../../components/user/products';
const Products = lazy(() => import('../../../components/user/products'));
function Home() {
  

  return (
    <>
<Suspense fallback = {<Loading />}>
 <Products />
</Suspense>
    
    </>
   
  )
}

export default Home