// 每次调用$.get(),$.post(),$.ajax()的时候，都会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们提供给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  // 再发起真正的ajax请求，统一拼接请求的根路径
  // options.url = `http://big-event-api-t.itheima.net${options.url}`
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  console.log(options.url);

})