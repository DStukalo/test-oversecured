import React from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

export const siteTitle = "Next.js Sample Website";

type LayoutProps = {
  children: React.ReactNode;
  isHome?: boolean;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-screen mx-auto min-h-screen bg-primary-100 px-4 py-0">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main
        className={`flex min-h-[75vh] w-full flex-col items-center justify-center`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
