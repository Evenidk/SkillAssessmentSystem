// types/violations.ts
export type ViolationType = 'multiple_faces' | 'tab_switch' | 'screen_recording';

export interface ViolationLimit {
  type: ViolationType;
  count: number;
  maxLimit: number;
}