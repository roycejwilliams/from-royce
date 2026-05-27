import "../styles/globals.css";
import Providers from "../providers";
import SmoothScroll from "../providers/SmoothScroll";
import Transition from "../components/Transition";
import Layout from "../components/layout";
import { AnimatePresence } from "motion/react";

export default function App({ Component, pageProps, router }) {
  const showNav = !Component.noNav;

  return (
    <Providers>
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
