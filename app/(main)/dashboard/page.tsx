import { redirect } from 'next/navigation'
import { fetchingUserOnboarding } from '../../../actions/user'

export default async function DashboardPage() {
  const { isOnboarded } = await fetchingUserOnboarding()

  if (!isOnboarded) {
    redirect('/onboarding')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Industry Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      </div>
    </div>
  )
}
