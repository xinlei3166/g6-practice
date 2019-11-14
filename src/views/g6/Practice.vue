<template>
  <div id="graph-wrap">
    <header class="header">
      <el-button plain v-text="edit ? '编辑' : '预览'" @click="edit=!edit"></el-button>
      <el-button v-if="edit" type="primary" plain @click="onAddNode">新增节点</el-button>
      <el-button v-if="edit" type="success" plain @click="onSave">保存节点</el-button>
    </header>
    <div id="graph" :style="{ width: graphWidth + 'px', height: graphHeight + 'px' }">
      <div id="node-context-menu">
        <el-button class="btn" type="primary" @click="onAdjacentAddNode">新增节点</el-button>
        <el-button class="btn" type="danger" @click="onRemoveNode">删除节点</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/lib/g6'

export default {
  name: 'G6-Practice',
  props: {
    graphWidth: { type: Number, default: 800 },
    graphHeight: { type: Number, default: 700 }
  },
  data() {
    return {
      graph: null,
      edit: false
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    onAdjacentAddNode() {
      this.graph.adjacentAddNode()
    },
    onAddNode() {
      if (this.edit) {
        this.graph.addNode()
      }
    },
    onRemoveNode() {
      this.graph.removeNode()
    },
    onSave() {
      const r = this.graph.graph.save()
      console.log(r)
    },
    async init() {
      const data = {
        nodes: [
          { class: 'node-0', id: '0', label: '第一个节点', x: 300, y: 50 },
          { class: 'node-1', id: '1', label: '第二个节点', x: 300, y: 100 },
          { class: 'node-2', id: '2', label: '第三个节点', x: 300, y: 150 },
          { class: 'node-3', id: '3', label: '第四个节点', x: 300, y: 200 },
          { class: 'node-4', id: '4', label: '第五个节点', x: 300, y: 250 },
          { class: 'node-5', id: '5', label: '第六个节点', x: 300, y: 300 }
        ],
        edges: [
          { source: '0', target: '1', weight: 1 },
          { source: '1', target: '2', weight: 1 },
          { source: '2', target: '3', weight: 1 }
        ]
      }
      this.graph = new Graph(data, { width: this.graphWidth, height: this.graphHeight })
      this.graph.render()
    }
  }
}
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar{
    display: none;
  }
  #graph-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    background: #E4E7ED;
    width: 800px;
    display: flex;
    padding: 10px 16px;
    box-sizing: border-box;
  }
  /deep/ .g6-minimap {
    position: absolute;
    top: 100px;
    left: 60px;
  }
  #graph {
    margin: 20px auto;
    position: relative;
  }
  #node-context-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    padding: 10px;
    left: -100px;
    visibility: hidden;
    background: #F2F6FC;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    .btn:not(:nth-of-type(1)) {
      flex-shrink: 0;
      width: 100px;
      margin-left: 0;
      margin-top: 5px;
    }
  }
</style>
