import Cookies from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'

// Axios interceptor. Auto log out when token is expired or invalid
export default function (context) {
  context.$axios.onResponse((response) => {
    const code = response.data.error.code
    const OK = APIs.responses.OK.code
    const message = response.data.error.message

    if (code === 2) {
      context.app.$logout(context.app.router)
    } else if (code === OK) {
      return {
        error: false,
        data: response.data,
      }
    } else if (code === 99) {
      context.app.$showWarnNotify(context.app.router.app, message)
      context.app.router.app.$log.warn('Có lỗi khi gọi API: ', {
        response,
      })
      return {
        error: true,
        data: response.data,
      }
    } else {
      context.app.$showWarnNotify(
        context.app.router.app,
        APIs.responses[code].message
      )
      context.app.router.app.$log.warn('Có lỗi khi gọi API: ', {
        response,
      })
      return {
        error: true,
        data: response.data,
      }
    }
  })

  context.$axios.onError((error) => {
    if (error.response.data.error.code == 403) {
      context.app.$showError(
        context.app.router.app,
        error.response.data.error.message
      )
      return
    } else if (error.response.data.error.code == 405) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName)
      })
      // context.app.$showError(
      //   context.app.router.app,
      //   "Phiên làm việc đã hết hạn"
      // )
      context.app.router.push('/dang-nhap').then()
      return
    }

    context.app.router.app.$log.error('Có lỗi/exception: ', {
      error,
      response: error.response,
    })

    context.app.$showError(
      context.app.router.app,
      'Có lỗi xảy ra khi kết nối đến server'
    )

    return {
      error: true,
    }
  })
}
