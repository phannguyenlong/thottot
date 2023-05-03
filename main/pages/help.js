import React from 'react'
import Layout from '../components/Layout'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import sass from '../styles/sass/pages/help.scss'
import NavigationIcon from '@material-ui/icons/Navigation'
class help extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      phone: '',
      email: '',
      reason: '',
      idea: ''
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <Grid container justify="space-evenly">
            <Button
              variant="contained"
              color="secondary"
              aria-label="Add"
              size="large"
            >
              <NavigationIcon />
              Messenger
            </Button>
            <Button variant="contained" color="secondary">
              0901235657
            </Button>
          </Grid>
          <div className={sass.form}>
            <p>
              Để Thợ Tốt hỗ trợ bạn nhanh chóng và hiệu quả. Vui lòng để lại mô
              tả chi tiết nội dung thông tin bên dưới cùng với họ tên, số điện
              thoại và email của bạn.
            </p>
            <TextField
              id="outlined-with-placeholder"
              fullWidth
              label="Họ và Tên"
              placeholder="Nguyễn Văn A"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('name')}
            />
            <TextField
              id="outlined-with-placeholder"
              fullWidth
              label="Số điện thoại"
              placeholder="0901234567"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('number')}
            />
            <TextField
              id="outlined-with-placeholder"
              fullWidth
              label="Email"
              placeholder="thotot.biz@gmail.com"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('email')}
            />
            <TextField
              id="outlined-with-placeholder"
              fullWidth
              label="Lý do"
              placeholder="abc xyz"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('reason')}
            />
            <TextField
              id="outlined-full-width"
              fullWidth
              label="Ý kiến của bạn"
              multiline
              rows="5"
              placeholder="Hãy nhập gì đó ..."
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('idea')}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              justify="flex-end"
            >
              Gửi
            </Button>
          </div>
          <br />
        </div>
      </Layout>
    )
  }
}
export default help
