export const ERROR_CODES = {
  // Common
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  ACTION_LIMIT_EXCEEDED: 'ACTION_LIMIT_EXCEEDED',

  // Auth
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_INVALID: 'TOKEN_INVALID',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Entity
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  ARTICLE_NOT_FOUND: 'ARTICLE_NOT_FOUND',
  COMMENT_NOT_FOUND: 'COMMENT_NOT_FOUND',
  DRAFT_NOT_FOUND: 'DRAFT_NOT_FOUND',
  AUDIO_DRAFT_NOT_FOUND: 'AUDIO_DRAFT_NOT_FOUND',
  TAG_NOT_FOUND: 'TAG_NOT_FOUND',
  NOTICE_NOT_FOUND: 'NOTICE_NOT_FOUND',
  ASSET_NOT_FOUND: 'ASSET_NOT_FOUND',

  // Article
  NOT_ENOUGH_MAT: 'NOT_ENOUGH_MAT',

  // User
  USER_EMAIL_INVALID: 'USER_EMAIL_INVALID',
  USER_EMAIL_EXISTS: 'USER_EMAIL_EXISTS',
  USER_EMAIL_NOT_FOUND: 'USER_EMAIL_NOT_FOUND',
  USER_PASSWORD_INVALID: 'USER_PASSWORD_INVALID',
  USER_USERNAME_INVALID: 'USER_USERNAME_INVALID',
  USER_USERNAME_EXISTS: 'USER_USERNAME_EXISTS',
  USER_DISPLAYNAME_INVALID: 'USER_DISPLAYNAME_INVALID',
  USER_FOLLOW_FAILED: 'USER_FOLLOW_FAILED',
  USER_INVITE_FAILED: 'USER_INVITE_FAILED',
  USER_INVITE_STATE_INVALID: 'USER_INVITE_STATE_INVALID',
  USER_INVITE_EMAIL_REGISTERED: 'USER_INVITE_EMAIL_REGISTERED',
  USER_INVITE_EMAIL_INVITED: 'USER_INVITE_EMAIL_INVITED',

  // Verification Code
  CODE_INVALID: 'CODE_INVALID',
  CODE_EXPIRED: 'CODE_EXPIRED'
}
