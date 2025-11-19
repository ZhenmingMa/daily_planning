import TodoList from '../components/TodoList'
import { ModuleLabels } from '../types'

export default function PersonalPage() {
  return (
    <div id="personal" className="container py-6 space-y-6">
      <h1 className="section-title">个人计划</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TodoList title={ModuleLabels.personalImprove} module="personalImprove" />
        <TodoList title={ModuleLabels.personalMisc} module="personalMisc" />
        <TodoList title={ModuleLabels.review} module="review" />
      </div>
    </div>
  )
}