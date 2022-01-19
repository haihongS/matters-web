import {
  ChangePasswordForm,
  Dialog,
  EmailLoginForm,
  EmailSignUpForm,
  ReCaptchaProvider,
  SelectLoginMethodForm,
  useDialogSwitch,
  useEventListener,
  useStep,
  VerificationLinkSent,
  WalletLoginForm,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'

import { AuthResultType } from '@/__generated__/globalTypes'

type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-select'
  | 'wallet-connect'
  | 'wallet-verify'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-verification-sent'
  | 'reset-password-request'
  // misc
  | 'complete'

const BaseUniversalAuthDialog = () => {
  const { currStep, forward } = useStep<Step>('select-login-method')

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const openDialog = () => {
    forward('select-login-method')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(OPEN_UNIVERSAL_AUTH_DIALOG, openDialog)

  return (
    <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
      {currStep === 'select-login-method' && (
        <SelectLoginMethodForm
          purpose="dialog"
          gotoWalletLogin={() => forward('wallet-select')}
          gotoEmailLogin={() => forward('email-login')}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-select' && (
        <WalletLoginForm.Select
          purpose="dialog"
          submitCallback={() => {
            forward('wallet-connect')
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'wallet-connect' && (
        <WalletLoginForm.Connect
          purpose="dialog"
          submitCallback={(ethAddress: string, type: AuthResultType) => {
            forward(
              type === AuthResultType.Signup ? 'wallet-verify' : 'complete'
            )
          }}
          closeDialog={closeDialog}
        />
      )}
      {currStep === 'wallet-verify' && (
        <WalletLoginForm.Verify
          purpose="dialog"
          submitCallback={() => {
            forward('complete')
          }}
          closeDialog={closeDialog}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <EmailLoginForm
          purpose="dialog"
          closeDialog={closeDialog}
          gotoEmailSignUp={() => forward('email-sign-up-init')}
          gotoResetPassword={() => forward('reset-password-request')}
        />
      )}
      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <EmailSignUpForm.Init
            purpose="dialog"
            submitCallback={() => forward('email-verification-sent')}
            gotoEmailLogin={() => forward('email-login')}
            closeDialog={closeDialog}
          />
        </ReCaptchaProvider>
      )}
      {currStep === 'email-verification-sent' && (
        <VerificationLinkSent type="changePassword" purpose="dialog" />
      )}
      {currStep === 'reset-password-request' && (
        <ChangePasswordForm.Request
          type="forget"
          purpose="dialog"
          submitCallback={() => forward('email-verification-sent')}
          closeDialog={closeDialog}
        />
      )}

      {/* Misc */}
      {currStep === 'complete' && <EmailSignUpForm.Complete purpose="dialog" />}
    </Dialog>
  )
}

const UniversalAuthDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_UNIVERSAL_AUTH_DIALOG, openDialog)
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseUniversalAuthDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default UniversalAuthDialog
