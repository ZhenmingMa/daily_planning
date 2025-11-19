import { useState } from 'react'
import { useStore } from '../store'
import { ModuleKey } from '../types'

type Props = {
  title: string
  module: ModuleKey
}

export default function TodoList({ title, module }: Props) {
  const [input, setInput] = useState('')
  const { lists, addTask, updateTask, toggleTask, deleteTask } = useStore()
  const items = lists[module] ?? []
  const sorted = items.slice().sort((a, b) => Number(a.done) - Number(b.done))
  const doneCount = items.filter((t) => t.done).length

  const onAdd = () => {
    const v = input.trim()
    if (!v) return
    const lines = v.split(/\n/).map((s) => s.trim()).filter(Boolean)
    for (const line of lines) addTask(module, line)
    setInput('')
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold flex-1">{title}</h2>
        <div className="text-xs text-gray-500">{doneCount}/{items.length}</div>
        <div className="flex gap-2">
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="添加任务..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) onAdd()
              if (e.key === 'Escape') setInput('')
            }}
          />
          <button className="btn btn-primary" onClick={onAdd}>添加</button>
        </div>
      </div>

      <ul className="space-y-2">
        {sorted.map((t) => (
          <li key={t.id} className="list-item" onDoubleClick={() => toggleTask(module, t.id)}>
            <input
              type="checkbox"
              checked={t.done}
              className="h-4 w-4"
              onChange={() => toggleTask(module, t.id)}
            />
            <input
              className="input flex-1"
              value={t.title}
              onChange={(e) => updateTask(module, t.id, { title: e.target.value })}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key.toLowerCase() === 'd') deleteTask(module, t.id)
                if ((e.ctrlKey || e.metaKey) && e.key === ' ') toggleTask(module, t.id)
              }}
            />
            <button className="btn btn-danger" onClick={() => deleteTask(module, t.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}