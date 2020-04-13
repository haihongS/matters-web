import { Layout } from '~/components'

import SettingsNotification from './SettingsNotification'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsNotification" />}
    />

    <SettingsNotification />
  </Layout.Main>
)
