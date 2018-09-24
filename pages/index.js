import Link from 'next/link'

import Header from '../components/header';
import Buttons from '../components/buttons';

export default () => (
  <div>
    <Header/>
    <i className="fab fa-2x fa-react"></i>
    <h2>Server-Side Rendered Routes</h2>
    <ul>
      <li><Link href='/page?id=first' as='/page/first'><a>My first page</a></Link></li>
      <li><Link href='/page?id=second' as='/page/second'><a>My second page</a></Link></li>
      <li><Link href='/page?id=third' as='/page/third'><a>My third page</a></Link></li>
    </ul>
    <Buttons/>
  </div>
)