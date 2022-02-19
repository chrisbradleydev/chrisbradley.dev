import Head from 'next/head';
import Layout, { fullName, projectName } from '../components/layout';

function Home() {
    return (
        <Layout home>
            <Head>
                <title>
                    {fullName}&apos;s personal website. | {projectName}
                </title>
            </Head>
            <section className="h-screen">
                <div />
            </section>
        </Layout>
    );
}

export default Home;
