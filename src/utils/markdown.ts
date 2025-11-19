import { ModuleLabels, ModuleKey } from '../types'

export function listsToMarkdown(lists: Record<ModuleKey, { id: string; title: string; done: boolean }[]>) {
  const ymd = new Date().toISOString().slice(0, 10)
  const personal: ModuleKey[] = ['personalImprove', 'personalMisc', 'review']
  const work: ModuleKey[] = ['dailyWork', 'workMisc', 'workImprove', 'microLearning', 'learnFromGreat', 'buildReputation']
  const lines: string[] = []
  lines.push(`# 每日计划 ${ymd}`)
  lines.push(`\n## 个人计划`)
  for (const key of personal) {
    const items = lists[key] ?? []
    lines.push(`\n### ${ModuleLabels[key]}`)
    if (items.length === 0) {
      lines.push('- （暂无）')
    } else {
      for (const t of items) {
        lines.push(`- [${t.done ? 'x' : ' '}] ${escapeMd(t.title)}`)
      }
    }
  }
  lines.push(`\n## 工作计划`)
  for (const key of work) {
    const items = lists[key] ?? []
    lines.push(`\n### ${ModuleLabels[key]}`)
    if (items.length === 0) {
      lines.push('- （暂无）')
    } else {
      for (const t of items) {
        lines.push(`- [${t.done ? 'x' : ' '}] ${escapeMd(t.title)}`)
      }
    }
  }
  return lines.join('\n')
}

function escapeMd(s: string) {
  return s.replace(/[<>]/g, (m) => ({ '<': '&lt;', '>': '&gt;' }[m]!))
}