import {BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import {fullName} from '~/content/metadata'

function Seis() {
  const name = 'Seis'
  const url = '/seis'
  const heading = 'Why so serious'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {name: 'Home', url: '/'},
          {name, url},
        ]}
      />
      <Layout
        pageName={name}
        seo={{
          url,
          description: `${heading} - The nefarious sixth page by ${fullName}.`,
        }}
      >
        <div />
      </Layout>
    </>
  )
}

export default Seis
