<template>
  <div class="login-main">
    <div class="l-main">
      <div class="title"><span>呱呱出行</span><i>车队管理登录</i></div>
      <Login></Login>
      <div class="login-save" @click="uaerLogin()" style="cursor: pointer;">登录</div>
    </div>
  </div>
</template>

<script>
import 'common/fontSize';
import axajax from 'axios';
import * as msgbox from 'common/msgBox';
import * as storage from 'common/storage';
import Login from './components/Login';

export default {
  name: 'app',
  components: {
    Login
  },
  methods: {
    uaerLogin () {
      let that = this;
      let uPhone = that.$children[0].uphone;
      let uValid = that.$children[0].valid;
      let negs = new RegExp(/^1(3[0-9]|4[579]|5[0-35-9]|8[0-9]|7[0135-8])+\d{8}$/);
      if (!negs.test(uPhone)) {
          // 提示框
          msgbox.messagePromptBox.tipMsgBox({'times': '', 'tips': '请输入正确的11位手机号'});
          return false;
      } else if (uValid.length === 0) {
          // 提示框
          msgbox.messagePromptBox.tipMsgBox({'times': '', 'tips': '请输入验证码'});
          return false;
      } else {
          storage.set('falseLogin', false);
          var qs = require('qs');
          axajax.post('/api/common/scheduling/login', qs.stringify({
            mobile: that.$children[0].uphone, // 手机号
            smsCode: that.$children[0].valid, // 验证码
            osType: 'wx', // 微信登录
            openId: storage.get('open_id') // 用户唯一标识
          }), {
            headers: {
              'os': 'wx',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            let thisData = response.data;
            if (thisData.status === 0) {
              storage.set('token', thisData.data.token);
              storage.set('uid', thisData.data.uid);
              console.log('/maintrip.html');
            } else {
              msgbox.messagePromptBox.tipMsgBox({'times': '', 'tips': thisData.msg});
            }
          }).catch((error) => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang='scss'>
body {
  background: #FAFAFA;
  font-size: 1.6%;
  height: 100%;
  width: 100%;
  position: initial;
  -webkit-user-select: none;
  overflow: hidden;
  background-image: url(images/img-back.png);
  background-repeat: no-repeat;
  background-size: 1.315rem .6rem;
  background-position: center 5rem;
  padding-top: .5rem;
}
.login-main {
  margin: .0rem .15rem 0 .15rem;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 0px #E3E3E3;
  .l-main {
    padding: .23rem .2rem;
  }
  .title {
    color: #3f3f3f;
    padding: 0 0 .3rem 0;
    border-bottom: 1px solid #F5F5F5;
  }
  .title {
      span{
        font-size: .21rem;
        color: inherit;
      }
      i{
        font-size: .16rem;
        color: inherit;
      }
  }
  .login-save {
    width: auto;
    height: 0.43rem;
    margin: 0 auto;
    text-align: center;
    color: #e6f9e3;
    background-color: #56E068;
    border-radius: 3px;
    font-size: 0.17rem;
    line-height: .43rem;
    margin-top: .15rem;
    -webkit-user-select: none;
    margin-bottom: .15rem;
  }
}
.footer {
  text-align: center;
  display: none;
  color: #bebebe;
  font-size: .12rem;
  position: absolute;
  bottom: .1rem;
  margin: 0 auto;
  width: 100%;
}
</style>
