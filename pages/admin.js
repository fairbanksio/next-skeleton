/**
 * This is an example of a simple (read only) user dashboard. To acess this page
 * page you need to use MongoDB and set '"admin": true' on your account.
 **/
import Link from 'next/link'
import Page from '../components/page'

import Loader from '../components/loader'
import User from '../models/user'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/appLayout';
import UserTable from '../components/userTable';

export default class extends Page {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    await this.updateData()
  }

  async onPageChange(page, sizePerPage) {
    this.options.page = page
    this.options.sizePerPage = sizePerPage
    await this.updateData()
  }

  async sizePerPageListChange(sizePerPage) {
    this.options.sizePerPage = sizePerPage
    await this.updateData()
  }

  async updateData() {
    if (this.props.session.user && this.props.session.user.admin == true){
      this.setState({
        data: await User.list()
      })
    } else {
      this.setState({
        data: null
      })
    }
  }

  render() {
    if (!this.props.session.user || this.props.session.user.admin !== true)
      return super.adminAcccessOnly()

    const data = (this.state.data) ? this.state.data : []

    return (
      <Layout {...this.props}>
        <div style={{ paddingLeft: '25px', paddingRight: '25px' }}>
          <h1 className="display-4">Administration</h1>
          <p className="lead text-muted ">
            This is an example read-only admin page which lists user accounts.
          </p>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Is Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => {
                  return (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.admin ? <i className='fas fa-check'/> : null}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <UserTable {...this.props}/>
          </Paper>
        </div>
      </Layout>
    )
  }

}
