import "../styles/globals.css";
import Head from "next/head";
import Providers from "../providers";
import SmoothScroll from "../providers/SmoothScroll";
import Transition from "../components/Transition";
import Layout from "../components/layout";
import { AnimatePresence } from "motion/react";

export default function App({ Component, pageProps, router }) {
  const showNav = !Component.noNav;

  return (
    <Providers>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <SmoothScroll>
        <Layout showNav={showNav}>
          <AnimatePresence mode="wait" initial={false}>
            <Transition key={router.route}>
              <Component {...pageProps} />
            </Transition>
          </AnimatePresence>
        </Layout>
      </SmoothScroll>
    </Providers>
  );
}
