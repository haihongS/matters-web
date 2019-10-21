import gql from 'graphql-tag'
import _uniqBy from 'lodash/uniqBy'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { Spinner } from '~/components'
import { useQuery } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import {
  EditorCollection,
  EditorCollection_article_collection_edges_node
} from './__generated__/EditorCollection'
import styles from './styles.css'

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String, $after: String, $first: Int) {
    article(input: { mediaHash: $mediaHash }) {
      ...EditorCollection
    }
  }
  ${articleFragments.editorCollection}
`

const CollectionEditor = dynamic(
  () => import('~/components/CollectionEditor'),
  {
    ssr: false,
    loading: () => <Spinner />
  }
)

const EditingList = ({
  article,
  editingArticles,
  setEditingArticles
}: {
  article: ArticleDetail_article
  editingArticles: EditorCollection_article_collection_edges_node[]
  setEditingArticles: (
    articles: EditorCollection_article_collection_edges_node[]
  ) => void
}) => {
  const { data, loading } = useQuery<EditorCollection>(EDITOR_COLLECTION, {
    variables: { mediaHash: article.mediaHash, first: null }
  })
  const edges = (data && data.article && data.article.collection.edges) || []

  // init `editingArticles` when network collection is received
  const edgesKeys = edges.map(({ node }) => node.id).join(',') || ''
  useEffect(() => {
    setEditingArticles(edges.map(({ node }) => node))
  }, [edgesKeys])

  if (loading) {
    return <Spinner />
  }

  return (
    <section className="editing-list">
      <CollectionEditor
        articles={editingArticles}
        onEdit={articles => setEditingArticles(_uniqBy(articles, 'id'))}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default EditingList
