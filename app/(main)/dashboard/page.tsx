import { redirect } from 'next/navigation'
import { fetchingUserOnboarding } from '../../../actions/user'
import { getIndustryInsights } from '../../../actions/dashboard'
import Dashboard from "./_components/Dashboard"

export default async function DashboardPage() {
  const { isOnboarded } = await fetchingUserOnboarding()
  const { industryInsights } = await getIndustryInsights()

  if (!isOnboarded) {
    redirect('/onboarding')
  }

  return (
    <div className="space-y-4">
      <Dashboard industryInsights={industryInsights} />
    </div>
  )
}
