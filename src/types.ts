export type Task = {
  id: string
  title: string
  note?: string
  done: boolean
  createdAt: string
  updatedAt?: string
}

export type ModuleKey =
  | 'dailyWork'
  | 'workMisc'
  | 'workImprove'
  | 'microLearning'
  | 'learnFromGreat'
  | 'buildReputation'
  | 'personalImprove'
  | 'personalMisc'
  | 'review'

export const ModuleLabels: Record<ModuleKey, string> = {
  dailyWork: '日常工作',
  workMisc: '杂事',
  workImprove: '工作提升',
  microLearning: '碎片化学习',
  learnFromGreat: '向优秀的人学习',
  buildReputation: '建立职场声誉',
  personalImprove: '个人精进',
  personalMisc: '杂事',
  review: '复盘',
}

export type HistorySnapshot = {
  date: string
  createdAt: string
  lists: Record<ModuleKey, Task[]>
}