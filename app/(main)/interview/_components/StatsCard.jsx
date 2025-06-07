import React from 'react'

const StatsCard = ({assessment}) => {
 const avgscore=()=>{
    if(!assessment.length)
        return 0;
    const total = assessment.reduce((sum, assessment) => sum + assessment.quizScore, 0);
    return (total/assessment.length).toFixed(1);
 }
 const getLatestAssessment=()=>{
    if(!assessment?.length)
        return null;
    return assessment[0];
 }
 const getTotalQue=()=>{
    if(!assessment?.length)
        return 0;
    return assessment.reduce((sum, assessment) => sum + assessment.question.length, 0);
 }
 
    return (
<Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Average Score </CardTitle>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-2xl font-semibold">{industryInsights.marketOutlook}</p>
                            <p className="text-sm text-gray-500">Next Update {nextUpdateDistance}</p>
                        </div>
                    </CardContent>
                </Card>
  ) 
}

export default StatsCard