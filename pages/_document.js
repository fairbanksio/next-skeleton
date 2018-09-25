import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  render() {
   const { pageContext } = this.props;

   return (
     <html lang="en" dir="ltr">
       <Head>
         <title>Next-Skeleton</title>
         <script src="//cdn.rawgit.com/namuol/cheet.js/master/cheet.min.js" type="text/javascript"></script>
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous"/>
         <link href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"/>
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
         <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"/>
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
         <link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Source+Code+Pro' rel='stylesheet' type='text/css'/>
         <link href='//fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'/>
         <meta charSet="utf-8" />
         {/* Use minimum-scale=1 to enable GPU rasterization */}
         <meta
           name="viewport"
           content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
         />
         {/* PWA primary color */}
         <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
         <link
           rel="stylesheet"
           href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
         />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
   );
 }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired,
    };

    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};
