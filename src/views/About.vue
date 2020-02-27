<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <el-select v-model="v">
        <el-option>111</el-option>
        <el-option>222</el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { MessageBox } from 'element-ui'
export default {
  data() {
    return { socketIo: null, v: '' }
  },
  mounted() {
    this.socket()
  },
  methods: {
    socket() {
      const url = 'http://localhost:8888'
      this.socketIo = io.connect(url)// 连接socket服务端
      // 后端推送来任务取消的消息时
      this.socketIo.on('patrol_msg', (msg) => {
        alert(msg)
      })
      this.socketIo.on('cancel_patrol_msg', (msg) => {
        let timeout = setTimeout(() => {
          MessageBox.close()
          console.log('setTimeout', msg)
        }, 3000)
        this.$alert(`您的任务【${msg}】已被用户取消，不用处理啦`, '任务取消', {
          confirmButtonText: '知道了',
          showConfirmButton: false,
          center: true,
          callback: () => {
            clearTimeout(timeout)
            console.log('手动关闭', msg)
          }
        })
      })
    }
  }
}
</script>
