import React from 'react'
import Layout from '../components/Layout'
import RepairBanner from '../static/images/about-us/RepairBanner.jpg'
import AboutImg1 from '../static/images/about-us/AboutImg1.jpg'
import AboutImg2 from '../static/images/about-us/AboutImg2.jpg'
import Grid from '@material-ui/core/Grid'
import sass from '../styles/sass/pages/gioi-thieu.scss'

class aboutus extends React.Component {
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <Grid item xs={12}>
            <img src={RepairBanner} className={sass.img1} />
          </Grid>
          <Grid className={sass.infoBox} container spacing={16}>
            <Grid item xs={12} className={sass.intro}>
              Một vài người bạn ngồi nói chuyện với nhau, họ bắt đầu nghĩ đến
              việc nó khó khăn và bất tiện như thế nào khi cần tìm thợ để sửa
              chữa, bảo trì hay thay thế các thiết bị, dụng cụ mà họ đang sử
              dụng. Họ quyết định tìm cách khắc phục vấn đề này và lập ra
              Thotot.
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <img src={AboutImg1} className={sass.img} />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              Thotot.biz là nền tảng công nghệ hỗ trợ người sử dụng giải quyết
              các vấn đề về tìm dịch vụ sửa chữa bảo dưỡng trong thời gian ngắn
              nhất, đáp ứng được nhu cầu vào đúng thời điểm và chính vì thế
              chúng tôi mang lại cho người sử dụng một giá trị và tiện ích bền
              vững. Với nền tảng này, Thotot có thể đem đến cho người sử dụng
              của mình nhiều hơn là một dịch vụ, đó là sự kết nối, không chỉ
              giữa thợ và khách hang mà còn xa hơn thế
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <img src={AboutImg2} className={sass.img} />
            </Grid>
            <Grid item xs={12} sm={8} md={8} className={sass.content}>
              Người sử dụng của chúng tôi xứng đáng được nhận một nền tảng an
              toàn, thông minh và thân thiện. Do đó chúng tôi đưa ra những tiêu
              chí, đánh giá để sàng lọc những dịch vụ sửa chữa có chất lượng và
              độ tin cậy cao nhất có thể. Chúng tôi muốn cải thiện đời sống của
              mọi người. Chúng tôi không gọi thợ là người làm công mà là đối
              tác. Chúng tôi muốn họ có đủ thu nhập và cơ hội làm việc. Chúng
              tôi muốn các đối tác của mình trở thành thợ tốt và chuyên nghiệp
              nhất có thể. Và họ tự làm việc cho chính mình, nơi họ có thể tự
              chủ động trong việc hoạt động và tài chính của họ.
            </Grid>
            <Grid item xs={12} sm={12} className={sass.ending}>
              Tóm lại
            </Grid>
            <Grid item xs={12} className={sass.ending}>
              Mục tiêu mà chúng tôi đặt ra không dễ dàng gì đạt được nhưng chúng
              tôi tin rằng Thotot.biz sẽ tạo ra kết nối đến mọi người vì một
              cuộc sống tốt hơn cho tất cả.
            </Grid>
          </Grid>
        </div>
      </Layout>
    )
  }
}
export default aboutus
