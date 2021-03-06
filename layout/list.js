import Link from 'next/link'
import Layout from './page'
import PostList from '../components/PostList'

const ListLayout = ({ lang, postList, previous_page_path, next_page_path, home_url, website_name, website_description, menu_items }) => {
  return (
    <>
      <Layout {...{ lang, home_url, website_name, website_description, menu_items }}>
        <section className="article-list">
          <PostList lang={lang} postList={postList} />
        </section>
        <section className='pagination flex flex-row justify-between'>
          {
            previous_page_path ? (
              <Link href={previous_page_path}>
                <a className='p-4 text-xl text-gray-800 hover:text-red-700'>← Newer posts</a>
              </Link>
            ) : (<span />)
          }
          {
            next_page_path ? (
              <Link href={next_page_path}>
                <a className='p-4 text-xl text-gray-800 hover:text-red-700'>Older posts →</a>
              </Link>
            ) : (<span />)
          }
        </section>
      </Layout>
    </>
  )
}

export default ListLayout
