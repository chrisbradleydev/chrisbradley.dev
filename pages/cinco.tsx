import {BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import {fullName} from '~/content/metadata'

function Cinco() {
  const name = 'Cinco'
  const url = '/cinco'
  const heading = `You're a wizard Harry`

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
          description: `${heading} - The magical fifth page by ${fullName}.`,
        }}
      >
        <div />
      </Layout>
    </>
  )
}

export default Cinco
