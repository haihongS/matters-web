import { useContext } from 'react'

import { IconChecked, LanguageContext, Translate } from '~/components'

import { ASSET_TYPE } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

interface SelectorProps {
  assets: Asset[]
  selected?: Asset
  setSelected: (asset?: Asset) => any
}

const Selector: React.FC<SelectorProps> = ({
  assets,
  selected,
  setSelected,
}) => {
  const { lang } = useContext(LanguageContext)

  const imageAssets = assets.filter(
    (asset) =>
      [ASSET_TYPE.embed, ASSET_TYPE.cover].indexOf(asset.type as any) >= 0
  )

  return (
    <section className="selector">
      <h3>
        <Translate
          zh_hant="你也可以選擇一張已有的圖片作為封面"
          zh_hans="你也可以选择一张已有的图片作为封面"
          en="you can choose an existing picture as cover"
        />
      </h3>

      <ul>
        {imageAssets.map((asset, index) => (
          <li
            key={asset.id}
            className={asset.path === selected?.path ? 'selected' : undefined}
          >
            <button
              type="button"
              onClick={() =>
                setSelected(asset.id === selected?.id ? undefined : asset)
              }
              aria-labelledby={translate({
                zh_hant: `設置第 ${index + 1} 張圖片為封面`,
                zh_hans: `设置第 ${index + 1} 张图片为封面`,
                en: `Set as cover`,
                lang,
              })}
            >
              <img src={asset.path} />

              {asset.path === selected?.path && (
                <IconChecked size="md" color="green" />
              )}
            </button>
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Selector
