// 双击连线
export const clickAddEdge = {
  getEvents() {
    return {
      'node:click': 'onClick',
      'node:dblclick': 'onDblclick',
      mousemove: 'onMousemove'
    }
  },
  onClick(ev) {
    const node = ev.item
    const graph = this.graph
    const model = node.getModel()
    const point = { x: ev.x, y: ev.y }
    const anchorIndex = node.getLinkPoint(point).anchorIndex
    // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
    if (this.graph.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: String(model.id),
        targetAnchor: anchorIndex
      })
      this.edge = null
      this.graph.addingEdge = false
    }
  },
  onDblclick(ev) {
    const graph = this.graph
    const node = ev.item
    const x = ev.x
    const y = ev.y
    const point = { x: x, y: y }
    const anchorIndex = node.getLinkPoint(point).anchorIndex
    this.edge = graph.addItem('edge', {
      sourceAnchor: anchorIndex,
      source: String(node.getModel().id),
      target: point
    })
    this.graph.addingEdge = true
    // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
    // if (this.graph.addingEdge && this.edge) {
    //   graph.updateItem(this.edge, {
    //     target: String(model.id)
    //   })
    //   this.edge = null
    //   this.graph.addingEdge = false
    // } else {
    //   // 点击节点，触发增加边
    //   this.edge = graph.addItem('edge', {
    //     source: String(model.id),
    //     target: point
    //   })
    //   this.graph.addingEdge = true
    // }
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

// 点击锚点连线
export const clickLinkPointAddEdge = {
  getEvents() {
    return {
      'node:click': 'onClick',
      // 'node:mouseenter': 'onMouseenter',
      mousemove: 'onMousemove'
    }
  },
  onClick (ev) {
    const clickAddEdge = ev.clickAddEdge
    const className = ev.target && ev.target._cfg.className
    if ((className && className.includes('rect-mark')) || clickAddEdge) {
      const graph = this.graph
      const node = ev.item
      const x = ev.x
      const y = ev.y
      const point = { x: x, y: y }
      const anchorIndex = node.getLinkPoint(point).anchorIndex
      // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
      if (this.graph.addingEdge && this.edge) {
        graph.updateItem(this.edge, {
          target: String(node.getModel().id),
          targetAnchor: anchorIndex
        })
        this.edge = null
        this.graph.addingEdge = false
      } else { // 点击节点，触发增加边
        this.edge = graph.addItem('edge', {
          shape: this.graph.edgeShape,
          sourceAnchor: anchorIndex,
          source: String(node.getModel().id),
          target: point
        })
        this.graph.addingEdge = true
      }
    }
  },
  // onMouseenter (ev) {
  //   const className = ev.target._cfg.className
  //   if (className.includes('rect-mark')) {
  //     const node = ev.item
  //     const point = { x: ev.x, y: ev.y }
  //     const anchorIndex = node.getLinkPoint(point).anchorIndex
  //     const graph = this.graph
  //     const model = node.getModel()
  //     // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
  //     if (this.graph.addingEdge && this.edge) {
  //       graph.updateItem(this.edge, {
  //         target: String(model.id),
  //         targetAnchor: anchorIndex
  //       })
  //       this.edge = null
  //       this.graph.addingEdge = false
  //     }
  //   }
  // },
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
