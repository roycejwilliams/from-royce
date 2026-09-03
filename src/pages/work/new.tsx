import Head from "next/head";
import SignIn from "../../components/signIn";
import WorkDraft from "../../components/workDraft";

function NewWork() {
  return (
    <>
      <Head>
        <title>New project – From Royce</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SignIn>
        <WorkDraft />
      </SignIn>
    </>
  );
}

export default NewWork;
