<template>
  <div id="mountNode"></div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  name: 'G6',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data = {
        nodes: [{
          id: 'node1',
          x: 100,
          y: 200,
          size: 80,
          label: '第一个节点',
          shape: 'circle', // circle 圆形，rect 正方形
          parent: 'g6'
        },
        {
          id: 'node2',
          x: 300,
          y: 200,
          size: 80,
          label: '第二个节点',
          shape: 'circle', // circle 圆形，rect 正方形
          parent: 'g6'
        }],
        edges: [{
          target: 'node2',
          source: 'node1'
        }]
      }
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 500,
        height: 500
      })
      graph.read(data)
    }
  }
}
</script>
