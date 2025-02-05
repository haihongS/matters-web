import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  List,
  QueryError,
  ShuffleButton,
  Spinner,
  Translate,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'

import { RECOMMEND_AUTHORS } from './gql'
import styles from './styles.css'

import { RecommendAuthors } from './__generated__/RecommendAuthors'

export type FeedType = 'trendy' | 'appreciated' | 'active'

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const viewer = useContext(ViewerContext)

  const { data, loading, error, refetch } = usePublicQuery<RecommendAuthors>(
    RECOMMEND_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: 0, type },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => refetch({ random: _random(0, 12), type })

  useEffect(() => {
    if (viewer.isAuthed) {
      shuffle()
    }
  }, [viewer.isAuthed])

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return (
      <section className="feed">
        <EmptyWarning
          description={
            <Translate
              zh_hant="還沒有可追蹤創作者"
              zh_hans="还没有可追踪创作者"
            />
          }
        />
      </section>
    )
  }

  return (
    <section className="feed">
      <section className="shuffle">
        <ShuffleButton onClick={shuffle} />
      </section>

      {loading && <Spinner />}

      {!loading && (
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Verbose
                user={node}
                spacing={['base', 'base']}
                borderRadius="xtight"
              />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
