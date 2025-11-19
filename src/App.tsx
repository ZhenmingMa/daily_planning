import WorkPage from './pages/WorkPage'
import PersonalPage from './pages/PersonalPage'
import { useStore } from './store'
import { listsToMarkdown } from './utils/markdown'

export default function App() {
  const { lists } = useStore()
  const onExport = () => {
    const md = listsToMarkdown(lists)
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-plan-${new Date().toISOString().slice(0,10)}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="container py-3 flex items-center gap-3">
          <div className="font-bold">每日计划清单</div>
          <div className="ml-auto flex gap-2">
            <button className="btn btn-primary" onClick={onExport}>导出Markdown</button>
            <a href="#personal" className="btn">个人</a>
            <a href="#work" className="btn">工作</a>
          </div>
        </div>
      </div>
      <PersonalPage />
      <WorkPage />
    </div>
  )
}