import Document, { Head, Main, NextScript } from 'next/document'
import Header from '../components/header';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Header />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
