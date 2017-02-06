<template>
  <div class="login-user">
    <span class="user-phone"><input type="tel" v-model="uphone" ref="uphone" name="uphone" id="uphone" data-seleindex="0" placeholder="请输入手机号码" maxlength="11" value=""></span>
    <div class="flexvalid">
      <span class="user-valid"><input type="tel" v-model="valid" ref="valid" name="valid" id="valid" data-seleindex="1"  placeholder="请输入验证码" value=""></span>
      <a class="avalid" id="avalid" @click="uaerAction()"><i v-show="isshow" style="display: none">{{times}}</i>{{avalid}} </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as msgbox from '../common/msgBox';

export default{
  data () {
    return {
      'uphone': '',
      'valid': '',
      'avalid': '获取验证码',
      'isshow': false,
      'times': 0
    };
  },
  methods: {
    uaerAction () {
      let that = this;
      if (that.$data.times === 0) {
        let uPhone = that.$data.uphone;
        let negs = new RegExp(/^1(3[0-9]|4[579]|5[0-35-9]|8[0-9]|7[0135-8])+\d{8}$/);
        if (!negs.test(uPhone)) {
          // 提示框
          msgbox.messagePromptBox.tipMsgBox({'times': '', 'tips': '请输入正确的11位手机号'});
          return false;
        } else {
          // 接口访问
          axios.get('/api/common/scheduling/sms_code', {
              params: {
                'mobile': that.$data.uphone
              }
            })
          .then((response) => {
            let thisData = response.data;
            if (thisData.status === 0) {
              that.$data.avalid = 'S后可发送';
              that.$data.isshow = true;
              that.$data.times = 60;
              let setInterTime = setInterval(function() {
                  that.$data.times--;
                  if (that.$data.times === 0) {
                      that.$data.avalid = '获取验证码';
                      that.$data.isshow = false;
                      clearInterval(setInterTime);
                      return;
                  }
              }, 1000);
            } else {
              msgbox.messagePromptBox.tipMsgBox({'times': '', 'tips': thisData.msg});
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
%inputs{
  outline: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 5px;
  background: none;
  border: none;
  font-size: .16rem;
  color: #333;
  text-indent: .15rem;
}
%vilphone{
  height: .43rem;
  display: -webkit-box;
  margin: .3rem 0 .15rem 0;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
}
.login-user{
  .user-phone{
    @extend %vilphone;
    input{
      @extend %inputs;
    }
  }
  .user-valid{
    @extend %vilphone;
    input{
      @extend %inputs;
    }
  }
  .flexvalid {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    -webkit-align-items: stretch;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-direction: row;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    box-flex: 1;
    -webkit-box-pack: justify;
    box-pack: justify;
    -webkit-box-align: justify;
    box-align: justify;
  }
  .user-valid {
    margin: 0 0 .15rem 0;
    width: 2.1rem;
  }
  a.avalid {
    font-size: .16rem;
    color: #23be03;
    height: .43rem;
    line-height: .443rem;
    text-align: right;
    flex: 1;
  }
  .actives {
    border: 1px solid #93E4AA;
  }
}
</style>
