import { useContext } from 'react'

import {
  ConnectWalletButton,
  Help,
  Tabs,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

export type SortByType = 'hottest' | 'newest' | 'icymi'

interface SortByProps {
  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void
}

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const viewer = useContext(ViewerContext)
  const isHottest = sortBy === 'hottest'
  const isNewset = sortBy === 'newest'
  const isICYMI = sortBy === 'icymi'
  const isSmallUp = useResponsive('sm-up')

  const isConnectedWallet = !!viewer.info.ethAddress

  return (
    <Tabs
      sticky
      side={
        viewer.isAuthed && !isConnectedWallet && isSmallUp ? (
          <ConnectWalletButton />
        ) : (
          <Help hasTime />
        )
      }
    >
      <Tabs.Tab onClick={() => setSortBy('hottest')} selected={isHottest}>
        <Translate zh_hant="熱門" zh_hans="热门" en="Trending" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('newest')} selected={isNewset}>
        <Translate zh_hant="最新" zh_hans="最新" en="Latest" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('icymi')} selected={isICYMI}>
        <Translate zh_hant="精華" zh_hans="精华" en="Featured" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy
