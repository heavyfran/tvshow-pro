import Router from 'next/router';

export default function Home() {
  return null;
}

Home.getInitialProps = (context) => {
  const country = context.query.country || 'us';

  process.browser
    ? Router.replace('/[country]', `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();
};
