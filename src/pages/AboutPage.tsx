import { VisionMission } from '../components/VisionMission'
import { ManagementTeam } from '../components/ManagementTeam'

export function AboutPage() {
  return (
    <>
      <div className="pt-20 bg-[#F7FAF8] sm:pt-24">
        <h1 className="sr-only">About Legacy Growth &amp; Development Hub</h1>
        <VisionMission />
        <ManagementTeam />
      </div>
    </>
  )
}
