export const customNode = (nodeSize) => {
  return {
    anchor: [
      [0.5, 0], // 上中
      [1, 0.5], // 右中
      [0.5, 1], // 下中
      [0, 0.5] // 左中
    ],
    setState (name, value, item) {
      let r = 4
      const group = item.getContainer()
      // 激活状态
      if (name === 'hover') {
        if (value) {
          group.addShape('circle', {
            attrs: {
              x: 0,
              y: -(nodeSize / 2),
              r: r,
              // fill: 'red',
              stroke: 'red'
            }
          })
          // 右
          group.addShape('circle', {
            attrs: {
              x: nodeSize / 2,
              y: 0,
              r: r,
              // fill: 'red',
              stroke: 'red'
            }
          })
          // 下
          group.addShape('circle', {
            attrs: {
              x: 0,
              y: nodeSize / 2,
              r: r,
              // fill: 'red',
              stroke: 'red'
            }
          })
          // 左
          group.addShape('circle', {
            attrs: {
              x: -(nodeSize / 2),
              y: 0,
              r: r,
              // fill: 'red',
              stroke: 'red'
              // fill: '#91d5ff'
            }
          })
        }
        return group
      }
    }
  }
}
