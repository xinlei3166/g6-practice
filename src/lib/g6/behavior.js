export const clickAddEdge = {
  getEvents() {
    return {
      'node:dblclick': 'onDblclick',
      mousemove: 'onMousemove'
    }
  },
  onDblclick(ev) {
    const node = ev.item
    const graph = this.graph
    const point = { x: ev.x, y: ev.y }
    const model = node.getModel()
    // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
    if (this.graph.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: String(model.id)
      })
      this.edge = null
      this.graph.addingEdge = false
    } else {
      // 点击节点，触发增加边
      this.edge = graph.addItem('edge', {
        source: String(model.id),
        target: point
      })
      this.graph.addingEdge = true
    }
  },
  onMousemove(ev) {
    const point = { x: ev.x, y: ev.y }
    if (this.graph.addingEdge && this.edge) {
      // 增加边的过程中，移动时边跟着移动
      this.graph.updateItem(this.edge, {
        target: point
      })
    } else {
      this.graph.removeItem(this.edge)
    }
  }
}
