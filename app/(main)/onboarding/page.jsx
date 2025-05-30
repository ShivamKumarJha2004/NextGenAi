import React from 'react'
import { industries } from '../../../data/industry'
import OnBoardingForm from './_components/onBoardingForm'
import { redirect } from 'next/navigation'
import { fetchingUserOnboarding } from '../../../actions/user'


const onBoardingPage= async() => {
  const {isOnboarded}=await fetchingUserOnboarding()

  if (isOnboarded) {
    redirect('/dashboard')
  }
  
    return (
    <div>
      <OnBoardingForm industries={industries} />
    </div>
  )
}

export default onBoardingPage
