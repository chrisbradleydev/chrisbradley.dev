import Container from './container'

function Header({heading}: {heading: string}) {
  return (
    <header className="py-10">
      <Container>
        <h1 className="text-3xl font-bold">{heading}</h1>
      </Container>
    </header>
  )
}

export default Header
