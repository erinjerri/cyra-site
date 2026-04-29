import { RenderTimeBiteBlocks } from '@/components/TimeBite/RenderTimeBiteBlocks'
import { timeBiteHome } from '@/endpoints/seed/timebite-home'

export default function Page() {
  return <RenderTimeBiteBlocks blocks={timeBiteHome.layout} />
}
