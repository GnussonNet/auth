import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="GAuth" />
        <meta name="application-name" content="GAuth" />
        <meta name="apple-mobile-web-app-title" content="GAuth" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.0.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.0.0" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.0.0" />
        <link rel="manifest" href="/site.webmanifest?v=1.0.0" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.0.0" color="#5683ff" />
        <link rel="shortcut icon" href="/favicon.ico?v=1.0.0" />
        <meta name="msapplication-TileColor" content="#5683ff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=1.0.0" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
