<template>
    <div class="login-wrap">

      <van-nav-bar title="标题" />
      <form>
         <van-cell-group>
        <van-field
        name='mobile'
        v-validate="'required|digits:11'"
        :error-message="errors.first('mobile')"
        v-model='user.mobile'
         clearable
          label="手机号"
          placeholder="请输入手机号"
          error />

       <van-field
        name='code'
        v-validate="'required|digits:6'"
        :error-message="errors.first('code')"
        v-model='user.code'
        clearable
        label="验证码"
        placeholder="请输入验证码">

             <van-button slot="button" size="small" type="default">发送验证码</van-button>

        </van-field>
      </van-cell-group>
      </form>
      <div class="logininfo">
      <van-button
       @click='handleLogin'
        type="info"
        :loading='btnLoading'
        loading-type='spinner'
        loading-text='登陆中'
        >登录</van-button>

      </div>

    <!-- 用来体验rem适配 -->
    <!-- <div class="navdiv"></div> -->
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      btnLoading: false

    }
  },
  // 自定义验证错误信息
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号',
          digits: '手机号必须是11位数'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位数'
        }

      }

    }
    this.$validator.localize('zh_CN', dict)
  },
  methods: {
    // 登陆事件
    async handleLogin () {
      try {
        // const data = await login(this.user)
        // console.log(res)
        // 跳转之前保存登录状态

        this.$validator.validate().then(async (valid) => {
          if (!valid) {
            return this.$toast.fail('登录失败')
          }
          // 验证成功后登录
          this.btnLoading = true
          this.$toast.success('登陆成功')
          const data = await login(this.user)

          this.$store.commit('setUser', data)
          console.log(this.$store)
          // 跳转到首页

          this.$router.push({
            name: 'home'
          })
        })
      } catch (err) {
        this.$toast.fail('登录失败')
        this.btnLoading = false
        console.log('登录失败' + err)
      }
    }
  }

}
</script>

<style lang='less' scoped>
    // .navdiv {
//   width: 750px;
//   height: 60px;
//   background-color: red;
// }

.logininfo{
    padding:10px;

    .van-button{
        width: 100%
    }
}
</style>
