import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import Head from "next/head";

const LoginPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const onFacebookLogin = () => {
    if (!sessionData?.user) {
      void signIn("facebook");
    }
  };

  if (sessionData) void router.push("/");

  return (
    <article className="mb-4 flex w-96 flex-col items-center justify-between gap-4">
      <Head>
        <title>Login | Test Oversecured</title>
      </Head>
      <div className="mb-4 flex w-96 flex-col items-center justify-between gap-20">
        <button
          className=" main-text rounded-sm border px-10 py-3 text-secondary-300 no-underline"
          onClick={onFacebookLogin}
        >
          {sessionData ? null : "Sign in Facebook"}
        </button>
      </div>
    </article>
  );
};
export default LoginPage;
