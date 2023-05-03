// name - route name
// pattern - route pattern
// page - page inside ./pages to be rendered

const routes = require('next-routes')
module.exports = routes()
  .add({
    name: 'xem-tho',
    pattern: '/xem-tho/:slug',
    page: 'xem-tho'
  })
  .add({
    name: 'profile',
    pattern: '/profile',
    page: 'profile'
  })
  .add({
    name: 'workerProfile',
    pattern: '/thong-tin-tho',
    page: 'workerProfile'
  })
  .add({
    name: 'branchesProfile',
    pattern: '/thong-tin-cua-hang',
    page: 'branchesProfile'
  })
  .add({
    name: 'dang-ky',
    pattern: '/dang-ky',
    page: 'dang-ky'
  })
  .add({
    name: 'dang-nhap',
    pattern: '/dang-nhap',
    page: 'dang-nhap'
  })
  .add({
    name: 'signupWorker',
    pattern: '/tho-dang-ky',
    page: 'signupWorker'
  })
  .add({
    name: 'signupIndividual',
    pattern: '/tho-dang-ky/ca-nhan',
    page: 'signupIndividual'
  })
  .add({
    name: 'signupBrand',
    pattern: '/tho-dang-ky/trung-tam',
    page: 'signupBrand'
  })
  .add({
    name: 'signinWorker',
    pattern: '/tho-dang-nhap',
    page: 'signinWorker'
  })
  .add({
    name: 'postJob',
    pattern: '/dang-tin',
    page: 'postJob'
  })
  .add({
    name: 'yeuCauChiTiet',
    pattern: '/yeu-cau/:slug',
    page: 'yeu-cau-chi-tiet'
  })
  .add({ name: 'yeu-cau', pattern: '/yeu-cau', page: 'yeu-cau' })
  .add({ name: 'tro-giup', pattern: '/tro-giup', page: 'tro-giup' })
