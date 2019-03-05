import { FC, useContext, useState } from 'react'

import {
  EmailChangeConfirmForm,
  EmailChangeRequestForm
} from '~/components/Form/EmailChangeForm'
import { LanguageContext } from '~/components/Language'
import ModalContent from '~/components/Modal/Content'
import { ViewerContext } from '~/components/Viewer'

import { translate } from '~/common/utils'

import styles from './styles.css'

/**
 * This component is a modal for changing email.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.EmailModal close={close} />
 * ```
 *
 */

type Step = 'request' | 'confirm' | 'complete'

const EmailModal: FC<ModalInstanceProps> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const viewer = useContext(ViewerContext)

  const [step, setStep] = useState<Step>('request')

  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm',
      email: viewer.info.email
    },
    confirm: {
      next: 'complete'
    }
  })

  const requestCallback = (params: any) => {
    const { codeId } = params
    setData(prev => {
      return {
        ...prev,
        request: {
          ...prev.request,
          codeId
        }
      }
    })
    setStep('confirm')
  }

  const confirmCallback = () => setStep('complete')

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {translate({
            zh_hant: '電子信箱修改成功',
            zh_hans: '邮箱修改成功',
            lang
          })}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <ModalContent>
        {step === 'request' && (
          <EmailChangeRequestForm
            defaultEmail={data.request.email}
            submitCallback={requestCallback}
          />
        )}
        {step === 'confirm' && (
          <EmailChangeConfirmForm
            oldData={data.request}
            submitCallback={confirmCallback}
          />
        )}
        {step === 'complete' && <Complete />}
      </ModalContent>
      <style jsx>{styles}</style>
    </>
  )
}

export default EmailModal
