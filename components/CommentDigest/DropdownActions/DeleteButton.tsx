import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'

import ICON_REMOVE from '~/static/icons/remove.svg?sprite'

import styles from './styles.css'

const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

const DeleteButton: React.FC<{
  commentId: string
  hideDropdown: () => void
}> = ({ commentId, hideDropdown }) => {
  return (
    <Mutation
      mutation={DELETE_COMMENT}
      variables={{ id: commentId }}
      optimisticResponse={{
        deleteComment: {
          id: commentId,
          state: 'archived',
          __typename: 'Comment'
        }
      }}
    >
      {deleteComment => (
        <button
          type="button"
          onClick={() => {
            deleteComment()
            hideDropdown()
          }}
        >
          <TextIcon
            icon={
              <Icon
                id={ICON_REMOVE.id}
                viewBox={ICON_REMOVE.viewBox}
                size="small"
              />
            }
            spacing="tight"
          >
            <Translate zh_hant="刪除" zh_hans="删除" />
          </TextIcon>
          <style jsx>{styles}</style>
        </button>
      )}
    </Mutation>
  )
}

export default DeleteButton
