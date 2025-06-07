import { Button } from '../../../../components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/Quiz'

const MockInterviewpage = () => {
  return (
    <div className='container max-w-4xl mx-auto px-4 py-8 space-y-8'>
      <div className='flex items-center'>
        <Link href={"/interview"}>
          <Button variant="link" className='gap-2 hover:gap-3 transition-all'>
            <ArrowLeft className='h-4 w-4'/>
            Back to interview Preparation 
          </Button>
        </Link>
      </div>

      <div className='space-y-4 text-center'>
        <h1 className='text-5xl md:text-6xl font-bold gradient-title'>Mock Interview</h1>
        <p className='text-muted-foreground text-lg'>Test your knowledge with industry-level questions</p>
      </div>

      <div className='mt-8'>
        <Quiz/>
      </div>
    </div>
  )
}

export default MockInterviewpage
