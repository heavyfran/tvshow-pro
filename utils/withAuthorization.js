import { Component } from 'react';
import cookies from 'nookies';
import Router from 'next/router';

const authenticate = (context) => {
  const { token } = cookies.get(context);

  cookies.set(
    context,
    'PlannedRoute',
    JSON.stringify({ as: context.asPath, href: context.pathname }),
    { path: '/' }
  );

  // check if cookie is present, server side
  // if not redirect user to signin page
  if (context.req && !token) {
    context.res.writeHead(302, { Location: '/signin' });
    context.res.end();
    return;
  }

  // check if cookie is present, client side
  if (!token) {
    Router.push('/signin');
    return;
  }

  return token;
};

export const isAuthenticated = (context) => {
  const { token } = cookies.get(context);

  return token;
};

export const withAuthorization = (WrappedComponent) => {
  return class extends Component {
    static async getInitialProps(context) {
      const token = authenticate(context);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));

      return { ...componentProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
