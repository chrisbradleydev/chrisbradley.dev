import Head from 'next/head';
import Layout, { fullName } from '../components/layout';

function Home() {
    return (
        <Layout home>
            <Head>
                <title>{fullName}</title>
            </Head>
            <section></section>
        </Layout>
    );
}

export default Home;
