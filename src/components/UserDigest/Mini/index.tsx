import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Avatar } from '~/components/Avatar'

import { toPath } from '~/common/utils'

import { UserDigestMiniUser } from './__generated__/UserDigestMiniUser'
import styles from './styles.css'

/**
 * UserDigest.Mini is a component for presenting user's avatar and display name.
 *
 * Usage:
 *
 *   <UserDigest.Mini user={user} />
 */

interface MiniProps {
  user: UserDigestMiniUser
  avatarSize?: 'xxxsmall' | 'xxsmall' | 'xsmall' | 'small'
  textSize?: 'small' | 'msmall' | 'xsmall'
  textWeight?: 'normal' | 'medium'
  spacing?: 'xxtight' | 'xtight'
  hasUserName?: boolean
}

const fragments = {
  user: gql`
    fragment UserDigestMiniUser on User {
      id
      userName
      displayName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const Mini = ({
  user,
  avatarSize = 'xxsmall',
  textSize = 'small',
  textWeight = 'normal',
  spacing = 'xtight',
  hasUserName
}: MiniProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClasses = classNames({
    container: true,
    [`text-${textWeight}`]: true,
    [`spacing-${spacing}`]: true,
    [`text-${textSize}`]: true
  })

  return (
    <>
      <section>
        <Link {...path}>
          <a className={containerClasses}>
            <Avatar size={avatarSize} user={user} />
            <span className="name-container">
              <span className="name">{user.displayName}</span>
              {hasUserName && (
                <span className="username">@{user.userName}</span>
              )}
            </span>
          </a>
        </Link>
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

Mini.fragments = fragments

export default Mini
