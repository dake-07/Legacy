import { VisionMission } from '../components/VisionMission'
import { ManagementTeam } from '../components/ManagementTeam'
import { Helmet } from 'react-helmet-async'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Legacy</title>
        <meta name="description" content="Learn about our vision, mission, and the leadership team driving Legacy." />
      </Helmet>
      <div className="pt-24 bg-[#F0FDFA]">
        <h1 className="sr-only">About Legacy Growth &amp; Development Hub</h1>
        <VisionMission />
        <ManagementTeam />
      </div>
    </>
  )
}
