
const { sep } = require('path')
// 这里sep是'/'是一个路径分隔符,因为不同浏览器分隔符不一样,所以使用这个来兼容不同浏览器
module.exports = ({ file }) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1// 路径中包含(...)
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}

// module.exports = {
//   plugins: {
//     'autoprefixer': {
//       overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
//     },
//     'postcss-pxtorem': {
//       rootValue: 75,
//       propList: ['*']
//     }
//   }
// }
