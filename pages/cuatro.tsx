import {BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import {fullName} from '~/content/metadata'

function Cuatro() {
  const name = 'Cuatro'
  const url = '/cuatro'
  const heading = 'This is Sparta'

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
          description: `${heading} - The legendary fourth page by ${fullName}.`,
        }}
      >
        <div />
      </Layout>
    </>
  )
}

export default Cuatro
