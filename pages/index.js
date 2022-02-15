import Head from 'next/head';
import Layout, { fullName } from '../components/layout';

function Home() {
    return (
        <Layout home>
            <Head>
                <title>{fullName}</title>
            </Head>
            <section className="h-screen">
                <div />
            </section>
        </Layout>
    );
}

export default Home;
