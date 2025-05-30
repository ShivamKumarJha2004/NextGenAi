import React from 'react'

const CoverLetter = async(params) => {
    console.log('====================================');
    console.log(params.id);
    console.log('====================================');
    const  id  = await params.id;
  return (
    <div>
      CoverLetter:{id}
    </div>
  )
}

export default CoverLetter
