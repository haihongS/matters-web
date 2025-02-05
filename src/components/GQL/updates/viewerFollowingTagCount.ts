import { DataProxy } from 'apollo-cache'
import gql from 'graphql-tag'

import { ERROR_CODES } from '~/common/enums'

import { ViewerFollowingTagCount } from './__generated__/ViewerFollowingTagCount'

const VIEWER_FOLLOWING_TAG_COUNT = gql`
  query ViewerFollowingTagCount {
    viewer {
      id
      following {
        tags(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`

const update = ({
  cache,
  type,
}: {
  cache: DataProxy
  type: 'increment' | 'decrement'
}) => {
  try {
    const cacheData = cache.readQuery<ViewerFollowingTagCount>({
      query: VIEWER_FOLLOWING_TAG_COUNT,
    })

    if (!cacheData || !cacheData.viewer) {
      return
    }

    if (type === 'increment') {
      cacheData.viewer.following.tags.totalCount++
    } else {
      cacheData.viewer.following.tags.totalCount--
    }

    cache.writeQuery({
      query: VIEWER_FOLLOWING_TAG_COUNT,
      data: cacheData,
    })
  } catch (e) {
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update
