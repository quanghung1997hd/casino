import ULT from '~/plugins/ult'
import Cookies from 'js-cookie'

export default function (context) {
  if (context.route.path === '/dang-nhap') {
    Cookies.set('token', 1);
    console.log(Cookies.get('token'))
    context.store.dispatch('login/isAuthenticated', context.req).then((res) => {
      if (res.length !== 0) {
        context.redirect('/')
      }
    })
  } else {
    context.store
      .dispatch('login/isAuthenticated', context.req)
      .then((res) => {
        if (res.length === 0 || res.length === undefined) {
          context.redirect('/dang-nhap')
        }
      })
      .catch((e) => {
        context.redirect('/dang-nhap')
      })
  }
}
