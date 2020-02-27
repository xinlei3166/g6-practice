import { polylineFinding } from './polylineFinding'

export const customPolyline = {
  getControlPoints (cfg) {
    if (!cfg.sourceNode) {
      return cfg.controlPoints
    }
    return polylineFinding(cfg.sourceNode, cfg.targetNode, cfg.startPoint, cfg.endPoint, 40)
  }
}
