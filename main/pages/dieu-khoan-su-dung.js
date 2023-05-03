import React from 'react'
import Layout from '../components/Layout'
import sass from '../styles/sass/pages/dieu-khoan-su-dung.scss'

class DieuKhoanSuDung extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'thototbiz@gmail.com'
    }
  }
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <h1 className={'${sass.tilte} ${sass.pageName}'}>
            <center>ĐIỀU KHOẢN SỬ DỤNG</center>
          </h1>
          <h1 className={sass.title}>A. THỎA THUẬN SỬ DỤNG CHUNG:</h1>
          <p>
            <b>
              Bạn vui lòng đọc kỹ các Điều khoản và Điều kiện này trước khi truy
              nhập và sử dụng dịch vụ trên website thotot.biz.
            </b>
          </p>
          <p>
            Bằng việc sử dụng dịch vụ của chúng tôi có nghĩa là bạn chấp thuận
            Điều Khoản và Điều Kiện này, bạn đồng ý bị ràng buộc bởi các quy
            định về sử dụng Dịch vụ trên website thotot.biz. Trường hợp có mâu
            thuẫn giữa các điều khoản dưới đây và hợp đồng của bạn với
            thotot.biz thì các điều khoản tương ứng dưới đây sẽ được ưu tiên áp
            dụng. 
          </p>
          <p>
            Chúng tôi có thể cập nhật điều khoản này theo thời gian mà không cần
            báo trước vì các lý do pháp lý hoặc theo quy định hoặc để cho phù
            hợp với hoạt động của website thotot.biz. Mọi thay đổi sẽ được thông
            báo cho bạn thông qua địa chỉ e-mail mà bạn cung cấp khi đăng ký
            hoặc thông qua một thông báo phù hợp trên trang website
            thotot.biz. Những thay đổi này sẽ áp dụng cho việc sử dụng trang web
            thotot.biz sau khi chúng tôi đã thông báo đến bạn. Nếu bạn không
            muốn chấp nhận Điều Khoản mới, bạn không nên tiếp tục sử dụng trang
            web thotot.biz. Nếu bạn tiếp tục sử dụng trang web thotot.biz kể từ
            ngày sự thay đổi có hiệu lực, việc sử dụng trang web thotot.biz tức
            là bạn đồng ý bị ràng buộc bởi Điều Khoản mới.
          </p>
          <h1 className={sass.title}>B.ĐĂNG KÝ – MẬT KHẨU – BẢO MẬT:</h1>
          <p>
            Khi bạn đăng ký sử dụng trang web thotot.biz, bạn sẽ được yêu cầu
            khởi tạo tài khoản và cung cấp cho thotot.biz các thông tin nhất
            định bao gồm số điện thoại và/hoặc địa chỉ email hợp lệ. Bạn phải
            bảo đảm sự chính xác và đầy đủ, không gây hiểu lầm của các thông tin
            chi tiết mà bạn cung cấp trong quá trình đăng ký tài khoản
            thotot.biz.
          </p>
          <p>
            Tài khoản của bạn được bảo mật bằng một mật khẩu do bạn tự tạo. Để
            tránh việc gian lận, bạn phải giữ mật khẩu này bảo mật và không được
            tiết lộ hoặc chia sẻ với bất kỳ người nào.
          </p>
          <p>
            Nếu thotot.biz có lý do để tin rằng có khả năng có hành vi vi phạm
            bảo mật hoặc sử dụng không đúng mục đích trang này, chúng tôi có
            quyền yêu cầu bạn thay đổi mật khẩu hoặc chúng tôi có thể tạm dừng
            tài khoản của bạn.
          </p>
          <p>
            Trường hợp bạn mất Mật khẩu hoặc hoặc sử dụng không đúng mục đích
            trang web thotot.biz, thì:
          </p>
          <ul>
            <li>Bạn phải chịu tất cả sự mất mát hoặc thiệt hại phát sinh</li>
            <li>
              Bạn chịu trách nhiệm sẽ bồi thường hoàn toàn cho thotot.biz trong
              trường hợp thotot.biz có xảy ra mất mát hoặc thiệt hại.
            </li>
          </ul>
          <p>
            Bạn phải thông báo ngay với chúng tôi khi có bất kỳ thay đổi thông
            tin đăng ký nào bằng việc cập nhật thông tin cá nhân của bạn để
            chúng tôi có thể liên lạc với bạn một cách hiệu quả.
          </p>
          <p>
            Thotot.biz có quyền xóa tài khoản và tất cả thông tin của bạn sau
            một thời gian dài không hoạt động.
          </p>
          <h1 className={sass.title}>C. QUY ĐỊNH VỀ VIỆC SỬ DỤNG TRANG WEB</h1>
          <p>
            Người sử dụng của trang web là các cá nhân, tổ chức đáp ứng và thực
            hiện các yêu cầu nêu tại phần A và B của Thỏa thuận này.
          </p>
          <p>Người sử dụng dịch vụ của trang web là:</p>
          <ol type="a">
            <li>Các tổ chức cá nhân đang tìm kiếm dịch vụ</li>
            <li>
              Các đối tác cung cấp dịch vụ cần tìm người để cung ứng dịch vụ
              thông qua việc cung cấp cho chúng tôi các thông tin liên quan đến
              nghề nghiệp và việc làm.
            </li>
          </ol>
          <b>Sau đây gọi chung là “Người sử dụng”</b>
          <p>
            Người sử dụng đồng ý không sử dụng trang web thotot.biz cho các mục
            đích sau đây:
          </p>
          <ol>
            <li>
              Phổ biến tài liệu bất hợp pháp, quấy rối, bôi nhọ, lăng mạ, đe
              dọa, độc hại, thô tục, khiêu dâm, hoặc bị phản đối hoặc vi phạm
              pháp luật Việt Nam hiện hành khác.
            </li>
            <li>
              Tuyên truyền các tài liệu khuyến khích hành vi cấu thành tội phạm,
              hoặc hoặc hành vi vi phạm quy định pháp luật Việt Nam hiện hành
              hoặc quy tắc ứng xử của cộng đồng.
            </li>
            <li>
              Sử dụng dịch vụ của trang web thotot.biz cho bất kỳ mục đích trái
              pháp luật hoặc hoạt động bất hợp pháp nào hoặc có thể tạo ra sự
              sách nhiễu cho bất kỳ người nào hoặc bao gồm bất kỳ đường dẫn nào
              đến tài liệu có nội dung xấu theo nhận định của thotot.biz.
            </li>
            <li>
              Tập hợp, sao chép hoặc nhân bản bằng bất kỳ cách nào các nội dung
              của trang web thotot.biz hoặc thông tin sẵn có từ trang web
              thotot.biz cho việc sử dụng rộng rãi; Liên kết tới bất kỳ nội dung
              nào của thotot.biz hoặc thông tin có sẵn từ bất kỳ từ trang web
              thotot.biz mà không được sự cho phép bằng văn bản của chủ sở hữu
              trang web thotot.biz.
            </li>
            <li>
              Tạo ra, tuyên truyền hoặc lưu trữ các bản sao tài liệu điện tử có
              bản quyền mà không có sự cho phép của chủ sở hữu.
            </li>
            <li>
              Cản trở việc sử dụng hoặc quyền lợi của người khác trên trang web
              thotot.biz.
            </li>
            <li>
              Sử dụng trang web web thotot.biz cho mục đích thương mại mà không
              được cho phép của chủ sở hữu.
            </li>
            <li>
              Cố tình gây trở ngại với dịch vụ đối với bất kỳ Người dùng, máy
              chủ hoặc mạng lưới, bao gồm và không giới hạn thông qua các phương
              thức chèn virus bất kỳ đến trang web thotot.biz , nạp chồng, “làm
              ngập”, “gửi thư rác”, “tạo bom mail”, hoặc “tạo sự cố”.
            </li>
            <li>
              Gửi thư, email, thực hiện các cuộc gọi, hoặc gửi các bản fax không
              cần thiết nhằm khuyến khích và/hoặc quảng cáo sản phẩm hoặc dịch
              vụ tới bất kỳ người dùng nào đang sử dụng trang thotot.biz.
            </li>
            <li>
              Sử dụng Dịch vụ thotot.bizcho bất kỳ mục đích trái pháp luật hoặc
              hoạt động bất hợp pháp nào.
            </li>
          </ol>
          <p>
            <b>Qui định đối với việc sử dụng Cơ Sở Dữ Liệu Hồ Sơ thotot.biz:</b>
          </p>
          <ol>
            <li>
              Bạn sẽ phải sử dụng Cơ Sở Dữ Liệu Hồ Sơ thotot.biz theo quy định
              của Điều Khoản này, đối với bất kỳ hợp đồng nào bạn ký kết với
              thotot.biz, và tuân thủ tất cả quy định pháp luật bao gồm quy định
              quản lý dữ liệu cá nhân.
            </li>
            <li>
              thotot.bizcấp cho bạn quyền có giới hạn, riêng tư, có thể chấm
              dứt, không thể chuyển nhượng, không độc quyền để truy cập vào Cơ
              Sở Dữ Liệu Hồ Sơ thotot.biz qua trang web thotot.biznhằm mục đích
              xem và/hoặc tải về một bản sao hồ sơ có sẵn chỉ dành cho việc sử
              dụng của bạn theo các điều khoản trong Mục này.
            </li>
            <li>
              Cơ Sở Dữ Liệu Hồ Sơ thotot.biz chỉ được truy cập và sử dụng bởi cá
              nhân bạn. Bạn sẽ được cung cấp mật khẩu riêng biệt cho phép bạn
              truy cập Cơ Sở Dữ Liệu Hồ Sơ.
            </li>
            <li>
              Bạn không được chia sẻ Tài khoản thotot.biz của bạn cho bất kỳ bên
              nào khác.
            </li>
            <li>
              Bạn đồng ý không tiết lộ bất kỳ dữ liệu nào từ Cơ Sở Dữ Liệu Hồ Sơ
              thotot.biz cho bất kỳ bên thứ ba nào, trừ khi bạn là đại lý tuyển
              dụng, quản lý được ủy quyền, hoặc sử dụng hồ sơ trực tiếp cho mục
              đích tuyển dụng.
            </li>
            <li>
              Bạn phải có biện pháp hành chính, kỹ thuật, vật chất phù hợp để
              bảo vệ dữ liệu bạn đã nhận từ Cơ Sở Dữ Liệu Hồ Sơ thotot.biz khỏi
              sự bị mất mát, sử dụng không đúng mục đích.
            </li>
            <li>
              Truy cập không được phép, thay đổi thông tin công khai hoặc hủy
              hoại.
            </li>
            <li>
              Cơ Sở Dữ Liệu Hồ Sơ thotot.biz không được sử dụng:
              <ol type="a">
                <li>
                  Cho bất kỳ mục đích nào khác ngoài tư cách nhà cung ứng dịch
                  vụ và người tìm dịch vụ.
                </li>
                <li>
                  Để thực hiện các cuộc gọi, gửi các bản fax, thư, email, hoặc
                  bài báo không cần thiết đến các chủ hồ sơ hoặc để liên hệ với
                  bất kỳ cá nhân nào trừ khi họ đồng ý.
                </li>
              </ol>
            </li>
            <li>
              Dữ liệu nhận được từ Cơ Sở Dữ Liệu Hồ Sơ thotot.biz sẽ không được
              lưu giữ lâu hơn mức cần thiết để đáp ứng các mục đích tại Mục này.
              Về khía cạnh này, bạn đồng ý và cam kết xóa, hủy và/hoặc dọn dẹp
              dữ liệu này trong hồ sơ của bạn thotot.biz
            </li>
            <li>
              Bạn không được phép sử dụng Cơ Sở Dữ Liệu Hồ Sơ thotot.biz trong
              bất kỳ hoàn cảnh nào, mà theo sự đánh giá riêng của , ảnh hưởng
              bất lợi đến việc kinh doanh, triển vọng kinh doanh, hoạt động của
              thotot.biz, hoặc đến chức năng của bất kỳ trang web thotot.biz
              hoặc Cơ Sở Dữ Liệu Hồ Sơ thotot.biz, hoặc gây trở ngại đến khả
              năng truy cập của các người dùng khác vào Cơ Sở Dữ Liệu Hồ Sơ.
            </li>
            <li>
              Để đảm bảo một trải nghiệm an toàn và hiệu quả cho tất cả các
              khách hàng của chúng tôi, thotot.biz có quyền giới hạn lưu lượng
              dữ liệu (bao gồm việc xem hồ sơ) mà có thể được truy cập bởi hoặc
              được cung cấp cho bạn trong bất kỳ khoảng thời gian nhất định, các
              giới hạn này có thể được điều chỉnh tuỳ theo điều kiện của
              thotot.biz theo thời gian.
            </li>
            <li>
              Bạn chỉ có thể sử dụng việc đăng ký của bạn tại Cơ Sở Dữ Liệu Hồ
              Sơ thotot.biz duy nhất cho việc tìm kiếm dịch vụ và cung ứng dịch
              vụ. Bạn bị nghiêm cấm sử dụng thông tin trong Cơ Sở Dữ Liệu Hồ Sơ
              thotot.biz để bán hoặc quảng bá bất kỳ sản phẩm, dịch vụ hoặc thực
              hiện bất kỳ hành động nào khác, theo nhận định của thotot.biz, là
              không phù hợp với Điều Khoản này, gây hiểu nhầm hoặc không đầy đủ,
              hoặc vi phạm quy định pháp luật.
            </li>
            <li>
              thotot.biz có thể chấm dứt, tạm dừng, cập nhật, thay đổi hoặc bổ
              sung, theo quyết định riêng của mình, tất cả hoặc một phần của Cơ
              Sở Dữ Liệu Hồ Sơ thotot.bizvào bất kỳ thời điểm nào. Bằng cách cho
              phép truy cập vào Cơ Sở Dữ Liệu Hồ Sơ thotot.biz, thotot.biz không
              truyền bất kỳ lợi ích nào vào hoặc đến Cơ Sở Dữ Liệu Hồ Sơ hoặc
              tài sản hoặc dịch vụ thotot.biz khác. Tất cả quyền, lợi ích vào và
              đến Cơ Sở Dữ Liệu Hồ Sơ được giữ lại tại thotot.biz.
            </li>
            <li>
              Bạn hiểu và thừa nhận rằng tất cả thông tin do bạn cung cấp, CV cá
              nhân, và/hoặc thông tin tài khoản của bạn sẽ được lưu trữ tại Cơ
              Sở Dữ Liệu thotot.biz và/hoặc Cơ Sở Dữ thotot.biz Liệu Hồ Sơ.
            </li>
            <li>
              Bạn hiểu, thừa nhận và đồng ý rằng tất cả các thông tin do bạn
              cung cấp, CV cá nhân, và/hoặc thông tin tài khoản của bạn có thể
              được chuyển sang các nước bên ngoài nơi cư trú của bạn nhằm mục
              đích lưu trữ và/hoặc xử lý dữ liệu. Vui lòng xem Chính Sách Bảo
              Mật của thotot.bizđể biết thêm chi tiết.
            </li>
            <li>
              Bằng việc gửi, đăng hoặc hiển thị Nội dung Người dùng trên hoặc
              thông qua trang web thotot.biz, tùy thuộc vào thiết lập riêng tư
              của bạn, bạn trao cho thotot.biz, quyền có phạm vi toàn thế giới,
              không độc quyền, không cần bản quyền tác giả để tái tạo, điều
              chỉnh, phân phối và công bố Nội dung Người dùng này thông qua
              trang web. thotot.biz sẽ không tiếp tục sử dụng quyền này trong
              một thời gian hợp lý về thương mại sau khi Nội dung Người dùng
              được xóa khỏi trang web thotot.biz có quyền tuỳ ý từ chối việc
              chấp nhận, đăng, hiển thị hoặc truyền tải bất kỳ Nội dung Người
              dùng nào.
            </li>
            <li>
              Nếu bạn đăng Nội dung Người dùng trong bất kỳ khu vực chung nào
              của bất kỳ trang web thotot.biz, bạn cũng cho phép các Người dùng
              khác truy cập, xem, lưu trữ và tái tạo Nội dung Người dùng này cho
              việc sử dụng cá nhân.
            </li>
            <li>
              thotot.biz được phép xem xét và loại bỏ bất kỳ Nội dung Người dùng
              nào, mà theo nhận định của mình, là vi phạm Điều Khoản này, vi
              phạm pháp luật, quy tắc hoặc quy định, có tính chất lăng mạ, gây
              rối, xúc phạm hoặc bất hợp pháp, hoặc vi phạm các quyền, hoặc nguy
              hại hoặc đe dọa sự an toàn của Người dùng của bất kỳ trang web
              tuyenlaodongphothong.com. thotot.bizcó quyền trục xuất người dùng
              và ngăn chặn quyền truy cập sau đó của họ tới trang web thotot.biz
              và/hoặc sử dụng các dịch vụ thotot.biz khi vi phạm Điều Khoản này
              hoặc vi phạm pháp luật, quy tắc hoặc quy định. thotot.biz được
              phép thực hiện bất kỳ hànhđộng nào liên quan đến Nội dung Người
              dùng khi tự xét thấy cần thiết hoặc thích hợp nếu thotot.biztin
              rằng Nội dung Người dùng có thể tạo ra trách nhiệm pháp lý cho
              thotot.biz, gây thiệt hại đến thương hiệu thotot.biz hoặc hình ảnh
              công cộng, hoặc dẫn đến việc thotot.bizđể mất người dùng.
            </li>
            <li>
              thotot.biz không đại diện hoặc đảm bảo tính trung thực, chính xác,
              hoặc độ tin cậy của Nội dung Người dùng, các sản phẩm phái sinh từ
              Nội dung Người dùng, hoặc bất kỳ thông tin liên lạc khác được đăng
              bởi Người dùng cũng như không xác nhận bất kỳ ý kiến nào được thể
              hiện bởi Người dùng. Bạn thừa nhận rằng việc tin tưởng nào vào tài
              liệu được đăng bởi Người dùng khác là rủi ro của riêng bạn.
            </li>
          </ol>
          <h1 className={sass.title}>Trách nhiệm của thotot.biz</h1>
          <ol>
            <li>
              thotot.biz không kiểm tra hoặc kiểm duyệt danh sách, bao gồm cả Hồ
              sơ cá nhân được đề xuất. thotot.biz không tham gia vào các giao
              dịch thực tế giữa nhà tuyển dụng và các ứng viên. Do đó,
              thotot.biz không chịu trách nhiệm đối với Nội dung Người dùng,
              chất lượng, tính an toàn và hợp pháp của công việc hoặc hồ sơ được
              đăng tải, sự trung thực và chính xác của các danh sách, khả năng
              của nhà tuyển dụng để đề xuất cơ hội việc làm cho các ứng viên hay
              khả năng đáp ứng công việc của các ứng viên và thotot.bizkhông đảm
              bảo cho bất kỳ công việc, hồ sơ cá nhân, sơ yếu lý lịch hoặc Nội
              dung Người dùng trên trang web thotot.biz.
            </li>
            <li>
              thotot.biz có quyền quyết định loại bỏ bất kỳ Nội dung Người dùng
              bao gồm nhưng không giới hạn Hồ sơ cá nhân, Tài liệu Nhà tuyển
              dụng, hoặc các tài liệu khác từ trang web thotot.biz theo thời
              gian. Khi thotot.biz tiến hành quyền này và có sự vi phạm Điều
              Khoản từ Người dùng, bất kỳ khoản thanh toán nào được thực hiện
              bởi Người dùng sẽ không được hoàn trả.
            </li>
            <li>
              Trang web thotot.biz cũng cung cấp nội dung từ các trang internet
              hoặc từ các nguồn thông tin khác và trong khi thotot.biz cố gắng
              đảm bảo các tài liệu đăng trên trang web thotot.biz được chính
              xác, uy tín và chất lượng cao, chúng tôi không thực hiện bất kỳ
              bảo đảm, bảo lãnh nào liên quan đến nội dung đó. Nếu thotot.biz
              được thông báo về bất kỳ sự sai sót trong các tài liệu trên trang
              web thotot.biz chúng tôi sẽ nỗ lực sửa chữa sai sót sớm nhất mà
              chúng tôi có thể.
            </li>
            <li>
              Vui lòng lưu ý rằng có những rủi ro, bao gồm nhưng không giới hạn
              ở những rủi ro gây tổn hại về vật chất, hoặc rủi ro khi giao tiếp
              với những người lạ mặt, người chưa đủ tuổi vị thành niên hay những
              người có hành vi giả mạo. Bạn gánh chịu các rủi ro liên quan đến
              việc giao tiếp những người dùng khác thông qua trang web
              thotot.biz. Bởi bản chất thông tin của người khác có thể gây khó
              chịu, có hại hoặc không chính xác, và trong một số trường hợp sẽ
              gây nhầm lẫn hoặc có dấu hiệu lừa đảo. Chúng tôi mong rằng bạn
              thận trọng khi sử dụng trang web thotot.biz.
            </li>
            <li>
              Trang web thotot.biz và Nội dung thotot.biz có thể chứa thông tin
              không chính xác hoặc lỗi đánh máy. thotot.biz không đảm bảo về
              tính chính xác, độ tin cậy, đầy đủ, kịp thời của bất kỳ trang web
              thotot.biz hoặc Nội dung thotot.biz. Việc sử dụng tất cả các trang
              web thotot.biz và Nội dung thotot.biz là rủi ro của riêng bạn.
            </li>
            <li>
              Không có thông tin nào trên trang web thotot.biz được coi là một
              sự tán thành, bảo đảm hoặc bảo lãnh cho bất kỳ Người dùng hoặc bên
              thứ ba nào, cho dù có liên quan đến các trang web, các sản phẩm,
              dịch vụ, tuyển dụng, kinh nghiệm, việc làm hoặc quy trình tuyển
              dụng hay không.
            </li>
            <li>
              Nếu chúng tôi vi phạm Điều Khoản này, chúng tôi sẽ chỉ chịu trách
              nhiệm đối với thiệt hại mà bạn phải gánh chịu như là một kết quả
              trực trực tiếp và trong phạm vi chúng là các hệ quả có thể được dự
              đoán trước cho cả hai bên tại thời điểm bạn sử dụng trang
              thotot.biz. Trách nhiệm pháp lý của chúng tôi trong bất kỳ hoàn
              cảnh nào sẽ không bao gồm các khoản thiệt hại kinh tế như mất dữ
              liệu, mất lợi nhuận hoặc gián đoạn kinh doanh.
            </li>
          </ol>
          <h1 className={sass.title}>Thời hạn và Chấm dứt hiệu lực</h1>
          <ol>
            <li>
              Điều khoản này có đầy đủ hiệu lực và tác dụng bất cứ khi nào bạn
              sử dụng trang web thotot.biz.{' '}
            </li>
            <li>
              thotot.bizcó quyền loại bỏ Nội dung Người dùng của bạn từ trang
              web thotot.biz và lập tức chấm dứt đăng ký hoặc quyền truy cập của
              bạn tại trang web thotot.biz và/hoặc các dịch vụ khác được cung
              cấp bởi thotot.biz, khi bạn vi phạm Điều Khoản này hoặc nếu
              thotot.bizkhông thể xác minh hoặc xác thực bất cứ thông tin nào mà
              bạn gửi đến khi đăng ký tại trang web thotot.biz.
            </li>
            <li>
              Ngay cả khi bạn không còn là Người dùng của trang web thotot.biz
              nữa, một số quy định nhất định tại Điều Khoản này sẽ vẫn còn có
              hiệu lực.
            </li>
          </ol>
          <h1 className={sass.title}>Quyền từ bỏ</h1>
          <ol>
            <li>
              thotot.biz không chịu trách nhiệm đối với bất kỳ mất mát thông tin
              theo bất kỳ cách nào bị gây ra từ kết quả của sự gián đoạn, tạm
              dừng hoặc chấm dứt Dịch vụ thotot.biz hoặc Nội dung thotot.biz,
              tính chính xác hoặc chất lượng thông tin có sẵn hoặc được truyền
              tải qua Dịch vụ thotot.biz.
            </li>
            <li>
              Bạn thừa nhận và đồng ý rằng thotot.biz không thực hiện chính sách
              kiểm duyệt các bài viết và biên tập hoặc sửa đổi bất kỳ dữ liệu
              hoặc nội dung của bất kỳ email hay bài đăng hoặc bất kỳ thông tin
              nào mà được thêm vào hoặc có sẵn hoặc được truyền tải đến hoặc từ
              một bên thứ ba đến hoặc đến hoặc thông qua trang web thotot.biz
              và/hoặc Dịch vụ thotot.biz.
            </li>
          </ol>
          <h1 className={sass.title}>Trang web của bên thứ ba</h1>
          <p>
            Nhằm tạo điều kiện thuận lợi cho người sử dụng, trang web thotot.biz
            bao gồm các đường dẫn đến các trang web khác hoặc các tài liệu ngoài
            tầm kiểm soát của chúng tôi. thotot.biz không chịu trách nhiệm.
          </p>
          <h1 className={sass.title}>Các điều khoản khác</h1>
          <ol>
            <li>
              Bạn không được phép chuyển giao bất kỳ các quyền nào của bạn theo
              Điều Khoản này cho người khác. Chúng tôi được phép chuyển giao các
              quyền của theo Điều Khoản này cho cơ sở kính doanh khác khi chúng
              tôi nhận thấy các quyền của bạn sẽ không bị ảnh hưởng.
            </li>
            <li>
              Nếu bạn vi phạm Điều Khoản này và thotot.bizlựa chọn bỏ qua,
              thotot.biz vẫn sẽ có quyền sử dụng quyền và biện pháp sau đó hoặc
              trong bất kỳ tình huống nào khi bạn vi phạm Điều Khoản.
            </li>
            <li>
              thotot.biz không chịu trách nhiệm cho bất kỳ vi phạm nào đối với
              Điều Khoản này gây ra bởi các tình huống vượt ngoài tầm kiểm soát
              hợp lý của chúng tôi.
            </li>
            <li>
              Nếu có bất kỳ quy định nào trong Điều Khoản này được tòa án hoặc
              hoặc cơ quan quản lý có thẩm quyền tìm ra là không hợp lệ hoăc
              không khả thi, sự vô hiệu hóa hoặc không thực thi của các quy định
              đó sẽ không ảnh hưởng đến các quy định khác trong Điều Khoản này
              và tất cả các điều khoản không bị ảnh hưởng bởi sự vô hiệu hóa
              hoặc không thực thi đó sẽ tiếp tục có hiệu lực thi hành.
            </li>
          </ol>
          <h1 className={sass.title}>Liên hệ</h1>
          <p>
            <b>Mọi thắc mắc của bạn vui lòng liên hệ chúng tôi qua email </b>
          </p>
          <p>
            Các thông báo tới thotot.biz phải được gửi đến các địa chỉ được liệt
            kê trên trang web thotot.biz.
          </p>
          <p>
            Chúng tôi sẽ gửi thông báo cho bạn qua địa chỉ bạn đã đăng ký hoặc
            địa chỉ mà thotot.biz nhận thấy là phù hợp để bạn nhận thông báo.
          </p>
        </div>
      </Layout>
    )
  }
}
export default DieuKhoanSuDung
