import { getAssessment } from '../../../actions/interview'
import React from 'react'
import StatsCard from './_components/StatsCard';
import PerformanceChart from './_components/PerformanceChart';
import QuizList from './_components/QuizList';


const InterviewPage = async() => {
  const assessment =await getAssessment();

  
  
  return (
    <div>
       <div>
        <h1 className='text-6xl font-bold gradient-title mt-10'>
          Interview Preparation
        </h1>
        <div>
          <StatsCard assessment={assessment}/>
          <PerformanceChart assessment={assessment}/>
          <QuizList assessment={assessment}/>

        </div>
       </div>
    </div>
  )
}

export default InterviewPage
