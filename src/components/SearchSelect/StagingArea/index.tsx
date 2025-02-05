import dynamic from 'next/dynamic'

import { Spinner, Translate } from '~/components'

import { TextId } from '~/common/enums'

import { SelectNode } from '../SearchingArea'
import SearchSelectNode from '../SearchSelectNode'
import areaStyles from '../styles.css'
import styles from './styles.css'

/**
 * This is a sub-component of search-and-select. It's a container
 * of selected nodes from <SearchingArea>. All nodes in it will be
 * submitted.
 */
export interface StagingNode {
  node: SelectNode
  selected: boolean
}

interface BaseStagingAreaProps {
  nodes: StagingNode[]
  setNodes: (nodes: StagingNode[]) => void

  hint: TextId
  inStagingArea: boolean
  draggable?: boolean
}

export interface CustomStagingAreaProps {
  nodes: StagingNode[]
  setNodes: (nodes: StagingNode[]) => void
  hint: TextId
}

type StagingAreaProps = BaseStagingAreaProps & {
  CustomStagingArea?: (props: CustomStagingAreaProps) => JSX.Element
}

const DynamicDraggableNodes = dynamic(() => import('./DraggableNodes'), {
  loading: Spinner,
})

const StagingArea: React.FC<StagingAreaProps> = ({
  nodes,
  setNodes,

  hint,
  inStagingArea,
  draggable,

  CustomStagingArea,
}) => {
  const toggleSelectNode = (node: SelectNode) => {
    const newNodes = nodes.map(({ node: n, selected: s }) => {
      if (n.id === node.id) {
        return { node, selected: !s }
      }
      return { node: n, selected: s }
    })
    setNodes(newNodes)
  }

  if (!inStagingArea) {
    return null
  }

  if (CustomStagingArea) {
    return (
      <section className="area">
        <CustomStagingArea nodes={nodes} setNodes={setNodes} hint={hint} />
      </section>
    )
  }

  return (
    <section className="area">
      {/* empty hint */}
      {nodes.length <= 0 && hint && (
        <section className="hint">
          <Translate id={hint} />
        </section>
      )}

      {/* draggable */}
      {nodes.length > 0 && draggable && (
        <DynamicDraggableNodes
          nodes={nodes}
          toggleSelectNode={toggleSelectNode}
          setNodes={setNodes}
        />
      )}

      {/* undraggable */}
      {nodes.length > 0 && !draggable && (
        <ul className="nodes">
          {nodes.map(({ node, selected }) => (
            <li key={node.id}>
              <SearchSelectNode
                node={node}
                selected={selected}
                onClick={toggleSelectNode}
                inStagingArea
              />
            </li>
          ))}
        </ul>
      )}

      <style jsx>{styles}</style>
      <style jsx>{areaStyles}</style>
    </section>
  )
}

export default StagingArea
