import G6 from '@antv/g6'
import Minimap from '@antv/g6/build/minimap'
import Grid from '@antv/g6/build/grid'
import { clickAddEdge } from './behavior'

const minimap = new Minimap({
  // size: [200, 120],
  container: 'graph-wrap',
  className: 'g6-minimap',
  viewportClassName: 'g6-minimap-viewport',
  type: 'default' // default/keyShape/delegate
})
const grid = new Grid()

const nodeSize = 70

const defaultOptions = {
  container: 'graph', // 指定图画布的容器 id，与第 9 行的容器对应
  // 画布宽高
  width: 700,
  height: 700,
  fitView: false, // 自动适配画布
  fitViewPadding: [ 20, 20, 20, 20 ], // 画布留边
  animate: true,
  plugins: [minimap, grid],
  layout: { // 可选，布局的方法及其配置项，默认为 random 布局。
    type: 'dagre', // 层次布局
    rankdir: 'TB',
    preventOverlap: true, // 防止节点重叠
    // nodeSize: nodeSize, // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
    linkDistance: 50 // 指定边距离为100
  },
  modes: {
    default: [
      { type: 'drag-canvas' },
      { type: 'click-select' }
    ], // 允许拖拽画布、放缩画布、拖拽节点
    edit: [
      { type: 'drag-canvas' },
      { type: 'click-select' },
      { type: 'drag-node' },
      { type: 'clickAddEdge' }
    ],
    all: [
      { type: 'drag-canvas' },
      { type: 'zoom-canvas' },
      { type: 'click-select' },
      { type: 'drag-node' },
      { type: 'clickAddEdge' },
      { type: 'tooltip' },
      { type: 'edge-tooltip' }
    ]
  },
  nodeStateStyles: { // 节点不同状态下的样式集合
    hover: { // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      // fill: '#e5f5ff'
    },
    // 鼠标点击节点，即 click 状态为 true 时的样式
    click: {
      stroke: '#000000',
      // stroke: '#000',
      lineWidth: 1
    }
  },
  edgeStateStyles: { // 边不同状态下的样式集合
    hover: {
      stroke: 'pink',
      lineWidth: 3
    },
    click: { // 鼠标点击边，即 click 状态为 true 时的样式
      stroke: 'pink',
      lineWidth: 3
    }
  },
  defaultNode: { // 节点在默认状态下的样式配置（style）和其他配置
    shape: 'rect', // circle rect ellipse
    size: nodeSize, // 节点大小
    style: { // 节点样式配置
      // fill: 'steelblue', // 节点填充色
      // stroke: '#666', // 节点描边色
      lineWidth: 1, // 节点描边粗细
      cursor: 'pointer'
    },
    labelCfg: { // 节点上的标签文本配置
      style: { // 节点上的标签文本样式配置
        // fill: '#fff' // 节点标签文字颜色
        cursor: 'pointer'
      }
    },
    anchorPoints: [
      [0.5, 0], // 上中
      [1, 0.5], // 右中
      [0.5, 1], // 下中
      [0, 0.5], // 左中
      [0, 0], // 左上
      [1, 0], // 右上
      [1, 1], // 右下
      [0, 1] // 左下
    ]
  },
  defaultEdge: { // 边在默认状态下的样式配置（style）和其他配置
    shape: 'line', // arc/polyline/line/quadratic/cubic/loop
    style: { // 边样式配置
      opacity: 1, // 边透明度
      stroke: '#303133', // 边描边颜色
      startArrow: false,
      endArrow: true,
      lineWidth: 1,
      lineAppendWidth: 5
    },
    labelCfg: { // 边上的标签文本配置
      autoRotate: true // 边上的标签文本根据边的方向旋转
    }
  }
}

export default class Graph {
  /**
   * 实例化 Graph
   * @param data  数据 => {
      nodes: [
        { class: 'node-0', id: '0', label: '第一个节点', x: 300, y: 100 },
        { class: 'node-1', id: '1', label: '第二个节点', x: 300, y: 200 },
        { class: 'node-2', id: '2', label: '第三个节点', x: 300, y: 300 },
        { class: 'node-3', id: '3', label: '第四个节点', x: 300, y: 400 }
      ],
      edges: [
        { source: '0', target: '1', weight: 1 }
      ]
    }
   * @param options 配置参数
   * @param events  监听事件
   * @param behaviors 注册行为(可自定义行为)
   * @param nodes 自定义节点
   * @param edges 自定义边
   */
  constructor(data, options, events, behaviors, nodes, edges) {
    this.data = data || {}
    const _options = options || {}
    this.options = { ...defaultOptions, ..._options }
    this.events = events || []
    this.behaviors = behaviors || []
    this.nodes = nodes || []
    this.edges = edges || []
    this.registerBehavior(this.behaviors)
    this.registerNode(this.nodes)
    this.registerEdge(this.edges)
    this.graph = new G6.Graph(this.options) // 创建 G6 图实例
    this.graph.data(this.data) // 读取数据
    this.addEvent(this.events)
    this.clickEdgeId = ''
    this.rightClickNodeId = ''
    this.clickNodeId = ''
  }
  render() {
    // 渲染图
    this.graph.render()
  }
  /**
   * 增加监听事件
   * @param events => [{name: 'edge:click', handler: e => {}}]
   */
  addEvent(events = []) {
    // 边相关事件
    this.graph.on('edge:mouseenter', e => {
      const edge = e.item // 获取鼠标进入的节点元素对象
      this.graph.setItemState(edge, 'hover', true) // 设置当前节点的 hover 状态为 true
    })
    this.graph.on('edge:mouseleave', e => {
      const edge = e.item // 获取鼠标离开的节点元素对象
      this.graph.setItemState(edge, 'hover', false) // 设置当前节点的 hover 状态为 false
    })
    this.graph.on('edge:click', e => {
      // 先将所有当前是 click 状态的边置为非 click 状态
      // const clickEdges = this.graph.findAllByState('edge', 'click')
      // clickEdges.forEach(ce => {
      //   this.graph.setItemState(ce, 'click', false)
      // })
      // this.graph.setItemState(edge, 'click', true) // 设置当前边的 click 状态为 true
      const edge = e.item // 获取被点击的边元素对象
      this.clickEdgeId = edge._cfg.id
    })
    this.graph.on('edge:contextmenu', e => {
      if (this.isEdit) {
        const edge = e.item
        this.graph.remove(edge)
      }
    })

    // 上下文监听事件
    this.graph.on('keydown', e => {
      if (e.code === 'Backspace' && this.clickEdgeId && this.isEdit) {
        const edge = this.graph.findById(this.clickEdgeId)
        this.graph.remove(edge)
      }
    })
    this.graph.on('click', e => {
      const clickEdges = this.graph.findAllByState('edge', 'click')
      clickEdges.forEach(ce => {
        this.graph.setItemState(ce, 'click', false)
      })
      const clickNodes = this.graph.findAllByState('node', 'click')
      clickNodes.forEach(cn => {
        this.graph.setItemState(cn, 'click', false)
      })
    })
    this.graph.on('contextmenu', e => {
      this.graph.addingEdge = false
    })

    // 节点监听事件
    this.graph.on('node:mouseenter', e => {
      const node = e.item
      this.graph.setItemState(node, 'hover', true) // 设置当前节点的 hover 状态为 true
    })
    this.graph.on('node:mouseleave', e => {
      const menu = document.getElementById('node-context-menu')
      menu.style.visibility = 'hidden'
      menu.style.left = '-100px'
      const node = e.item
      this.graph.setItemState(node, 'hover', false) // 设置当前节点的hover 状态为 false
    })
    this.graph.on('node:contextmenu', e => {
      if (this.isEdit) {
        const menu = document.getElementById('node-context-menu')
        menu.style.left = e.x + 'px'
        menu.style.top = e.y + 'px'
        menu.style.visibility = 'visible'
        this.rightClickNodeId = e.item.getModel().id
      } else {
        e.event.preventDefault()
      }
    })
    this.graph.on('node:click', e => {
      // 先将所有当前是 click 状态的节点置为非 click 状态
      const clickNodes = this.graph.findAllByState('node', 'click')
      clickNodes.forEach(cn => {
        this.graph.setItemState(cn, 'click', false)
      })
      const node = e.item // 获取被点击的节点元素对象
      this.graph.setItemState(node, 'click', true) // 设置当前节点的 click 状态为 true
      this.clickNodeId = node.getModel().id
    })

    for (let event of events) {
      this.graph.on(event.name, event.handler)
    }
  }
  registerBehavior(behaviors = []) {
    G6.registerBehavior('clickAddEdge', clickAddEdge)
    for (let b of behaviors) {
      G6.registerBehavior(b.type, b.behavior)
    }
  }
  registerNode(nodes = []) {
    for (let node of nodes) {
      G6.registerNode(node.shapeType, node.cfg)
    }
  }
  registerEdge(edges = []) {
    for (let edge of edges) {
      G6.registerEdge(edge.shapeType, edge.cfg)
    }
  }
  save() {
    return this.graph.save()
  }
  addNode(node) {
    let _x = 300
    let _y = 300
    let id
    if (node) {
      const { x, y } = node.getModel()
      _x = x + 100
      _y = y
    }
    const nodes = this.graph.getNodes()
    if (nodes.length === 0) {
      id = 1
    } else {
      id = parseInt(nodes[nodes.length - 1].getModel().id) + 1
    }
    this.graph.addItem('node', {
      x: _x,
      y: _y,
      id: id, // 生成唯一的 id
      class: 'node-' + id,
      label: '新节点'
    })
    this.graph.paint()
  }
  adjacentAddNode() {
    if (this.rightClickNodeId) {
      const node = this.graph.findById(this.rightClickNodeId)
      this.addNode(node)
    }
  }
  addEdge(e) {
    const node = this.graph.findById(this.rightClickNodeId)
    const params = { item: node, ...this.graph.getPointByClient(e.clientX, e.clientY) }
    this.graph.emit('node:dblclick', params)
    this.resetNodeContentMenu()
    // this.graph.getPointByClient(e.clientX, e.clientY)
    // this.graph.getClientByPoint(model.x, model.y)
  }
  removeNode() {
    if (this.clickNodeId) {
      this._removeNode(this.clickNodeId)
    }
  }
  rightRemoveNode() {
    if (this.rightClickNodeId) {
      this._removeNode(this.rightClickNodeId)
      this.resetNodeContentMenu()
    }
  }
  _removeNode(id) {
    const node = this.graph.findById(id)
    this.graph.remove(node)
  }
  resetNodeContentMenu() {
    const menu = document.getElementById('node-context-menu')
    menu.style.visibility = 'hidden'
    menu.style.left = '-100px'
  }
  setMode(mode = 'default') {
    this.graph.setMode(mode)
  }
  get isEdit() {
    return this.graph.getCurrentMode() === 'edit'
  }
}
