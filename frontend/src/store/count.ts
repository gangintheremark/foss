import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


type TCountStore = {
    count: number
    actions : {
        increase: () => void
        decrease: () => void
    }
  }

  export const useCountStore = create<TCountStore>()(
    devtools((set) => ({
      count: 0,
    actions : {
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 })),
        }
    }))
  )