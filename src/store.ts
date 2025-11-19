import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, ModuleKey, HistorySnapshot } from './types'

type State = {
  lists: Record<ModuleKey, Task[]>
  history: HistorySnapshot[]
}

type Actions = {
  addTask: (module: ModuleKey, title: string) => void
  updateTask: (module: ModuleKey, id: string, patch: Partial<Omit<Task, 'id'>>) => void
  toggleTask: (module: ModuleKey, id: string) => void
  deleteTask: (module: ModuleKey, id: string) => void
  saveSnapshot: (date?: string) => void
  deleteSnapshot: (date: string) => void
}

const emptyLists: Record<ModuleKey, Task[]> = {
  dailyWork: [],
  workMisc: [],
  workImprove: [],
  microLearning: [],
  learnFromGreat: [],
  buildReputation: [],
  personalImprove: [],
  personalMisc: [],
  review: [],
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      lists: emptyLists,
      history: [],
      addTask: (module, title) =>
        set((state) => {
          const now = new Date().toISOString()
          const task: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            done: false,
            createdAt: now,
          }
          return {
            lists: { ...state.lists, [module]: [task, ...state.lists[module]] },
          }
        }),
      updateTask: (module, id, patch) =>
        set((state) => ({
          lists: {
            ...state.lists,
            [module]: state.lists[module].map((t) =>
              t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t
            ),
          },
        })),
      toggleTask: (module, id) => {
        const current = get().lists[module]
        const next = current.map((t) =>
          t.id === id ? { ...t, done: !t.done, updatedAt: new Date().toISOString() } : t
        )
        set((state) => ({ lists: { ...state.lists, [module]: next } }))
      },
      deleteTask: (module, id) =>
        set((state) => ({
          lists: { ...state.lists, [module]: state.lists[module].filter((t) => t.id !== id) },
        })),
      saveSnapshot: (date) =>
        set((state) => {
          const d = date ?? new Date().toISOString().slice(0, 10)
          const snap: HistorySnapshot = {
            date: d,
            createdAt: new Date().toISOString(),
            lists: state.lists,
          }
          const filtered = state.history.filter((h) => h.date !== d)
          return { history: [snap, ...filtered] }
        }),
      deleteSnapshot: (date) =>
        set((state) => ({ history: state.history.filter((h) => h.date !== date) })),
    }),
    {
      name: 'daily-plan-store',
      version: 2,
      migrate: (state: any, version: number) => {
        const prev = state ?? {}
        const lists = { ...emptyLists, ...(prev.lists ?? {}) }
        const history = Array.isArray(prev.history) ? prev.history : []
        return { ...prev, lists, history }
      },
    }
  )
)