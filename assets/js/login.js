$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui获取form对象
  const form = layui.form
  const layer=layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于判断
      // 如果判断失败则return一个提示消息
      // 通过属性选择器获取密码框中的值
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })


  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    // 发起ajax的post请求
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      },
      // data:$(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功')
        // 模拟点击事件
        $('#link_login').click()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登陆成功')
        // console.log(res.token);
        // 将登陆成功后得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href='/index.html'
      }
    })
  })
})


// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIyMywidXNlcm5hbWUiOiJiNSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjY1MzEyMjIwLCJleHAiOjE2NjUzNDgyMjB9.9wAkAyceS-FXohRg_pcmxkeukFdLRRJj8wyxsTqbmGQ