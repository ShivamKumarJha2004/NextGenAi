import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const layout = ({children}) => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            {children}
        </div>
        <Suspense fallback={<BarLoader className="mt-4" width={100} color="#36d7b7" />}>

            {children}
        </Suspense>
    </div>
  )
}

export default layout