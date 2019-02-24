// External modules
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

// Internal modules
import { Icon } from '~/components'

import ICON_BOOKMARK_REGULAR_ACTIVE from '~/static/icons/bookmark-regular-active.svg?sprite'
import ICON_BOOKMARK_SM_ACTIVE from '~/static/icons/bookmark-small-active.svg?sprite'
import { BookmarkArticle } from './__generated__/BookmarkArticle'

const UNSUBSCRIBE_ARTICLE = gql`
  mutation UnsubscribeArticle($id: ID!) {
    unsubscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`

const Unsubscribe = ({
  article,
  size
}: {
  article: BookmarkArticle
  size: 'small' | 'default'
}) => (
  <Mutation
    mutation={UNSUBSCRIBE_ARTICLE}
    variables={{ id: article.id }}
    optimisticResponse={{
      unsubscribeArticle: {
        id: article.id,
        subscribed: false,
        __typename: 'Article'
      }
    }}
  >
    {(unsubscribe, { data }) => (
      <button type="button" aria-label="收藏" onClick={() => unsubscribe()}>
        <Icon
          size={size}
          className="u-motion-icon-hover"
          id={
            size === 'small'
              ? ICON_BOOKMARK_SM_ACTIVE.id
              : ICON_BOOKMARK_REGULAR_ACTIVE.id
          }
          viewBox={
            size === 'small'
              ? ICON_BOOKMARK_SM_ACTIVE.viewBox
              : ICON_BOOKMARK_REGULAR_ACTIVE.viewBox
          }
        />
      </button>
    )}
  </Mutation>
)

export default Unsubscribe
