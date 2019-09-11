import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Spinner } from '~/components/Spinner'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface Props {
  prevStep: () => void
  nextStep: () => void
  scrollLock?: boolean
}

const VIEWER_LIKER_ID = gql`
  query ViewerLikerId {
    viewer {
      id
      likerId
    }
  }
`

const Binding: React.FC<Props> = ({ prevStep, nextStep, scrollLock }) => {
  const [polling, setPolling] = useState(true)

  return (
    <Query
      query={VIEWER_LIKER_ID}
      pollInterval={polling ? 1000 : undefined}
      errorPolicy="none"
      fetchPolicy="network-only"
      skip={!process.browser}
    >
      {({ data, loading, error }: QueryResult) => {
        const likerId = _get(data, 'viewer.likerId')

        if (likerId) {
          nextStep()
          return null
        }

        if (error) {
          setPolling(false)
        }

        return (
          <>
            <Modal.Content scrollLock={scrollLock}>
              <section className="container">
                {!error && (
                  <>
                    <Spinner />
                    <p>
                      <Translate
                        zh_hant="請在新頁面完成綁定，不要關閉本窗口"
                        zh_hans="请在新页面完成绑定，不要关闭本窗口"
                      />
                    </p>
                  </>
                )}
                {error && (
                  <p>
                    <Translate
                      zh_hant="哎呀，設置失敗了。"
                      zh_hans="哎呀，设置失败了。"
                    />
                  </p>
                )}
              </section>
            </Modal.Content>

            <footer>
              <Modal.FooterButton onClick={prevStep} width="full">
                <Translate
                  zh_hant={TEXT.zh_hant.retry}
                  zh_hans={TEXT.zh_hans.retry}
                />
              </Modal.FooterButton>
            </footer>

            <style jsx>{styles}</style>
          </>
        )
      }}
    </Query>
  )
}

export default Binding
