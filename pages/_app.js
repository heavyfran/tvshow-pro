// import App from 'next/app'
import Header from '../components/header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      <style jsx>{`
        @font-face {
          font-family: 'raleway';
          src: url('/fonts/raleway/Raleway-Regular.ttf') format('truetype');
        }

        :global(html) {
          font-family: 'raleway';
        }

        :global(ul) {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }

        :global(form) {
          display: flex;
          width: 100%;
          flex-direction: column;
          text-align: center;
        }

        :global(input) {
          margin-top: 20px;
          padding: 10px;
          width: 100%;
          font-size: 20px;
          box-sizing: border-box;
        }

        :global(button) {
          padding: 10px;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          background-color: blue;
          color: #fff;
          font-size: 20px;
        }

        :global(.error) {
          color: red;
          padding: 10px;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
