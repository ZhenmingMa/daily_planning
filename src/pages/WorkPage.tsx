import TodoList from '../components/TodoList'
import { ModuleLabels } from '../types'

export default function WorkPage() {
  return (
    <div id="work" className="container py-6 space-y-6">
      <h1 className="section-title">工作计划</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TodoList title={ModuleLabels.dailyWork} module="dailyWork" />
        <TodoList title={ModuleLabels.workMisc} module="workMisc" />
        <TodoList title={ModuleLabels.workImprove} module="workImprove" />
        <TodoList title={ModuleLabels.microLearning} module="microLearning" />
        <TodoList title={ModuleLabels.learnFromGreat} module="learnFromGreat" />
        <TodoList title={ModuleLabels.buildReputation} module="buildReputation" />
      </div>
    </div>
  )
}