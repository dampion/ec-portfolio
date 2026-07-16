import { describe, expect, it } from 'vitest'
import {
  getSecondsUntilNextTaipeiDay,
  getTaipeiDateKey,
  recordPageView,
  type PageViewStore,
} from '../../server/utils/page-view'

class MemoryStore implements PageViewStore {
  private readonly values = new Map<string, string | number>()

  async set(key: string, value: string | number, options?: { nx?: boolean }) {
    if (options?.nx && this.values.has(key)) return null
    this.values.set(key, value)
    return 'OK' as const
  }

  async get<T>(key: string) {
    return (this.values.get(key) as T | undefined) ?? null
  }

  async incr(key: string) {
    const next = Number(this.values.get(key) ?? 0) + 1
    this.values.set(key, next)
    return next
  }
}

describe('page view counter', () => {
  it('starts at 35 and counts each visitor once per Taipei day', async () => {
    const store = new MemoryStore()
    const dayOne = new Date('2026-07-16T04:00:00.000Z')
    const dayTwo = new Date('2026-07-17T04:00:00.000Z')

    await expect(recordPageView(store, 'visitor-a', dayOne))
      .resolves.toEqual({ count: 36, counted: true })
    await expect(recordPageView(store, 'visitor-a', dayOne))
      .resolves.toEqual({ count: 36, counted: false })
    await expect(recordPageView(store, 'visitor-b', dayOne))
      .resolves.toEqual({ count: 37, counted: true })
    await expect(recordPageView(store, 'visitor-a', dayTwo))
      .resolves.toEqual({ count: 38, counted: true })
  })

  it('uses the Asia/Taipei calendar boundary', () => {
    const beforeMidnight = new Date('2026-07-16T15:59:59.500Z')
    const afterMidnight = new Date('2026-07-16T16:00:00.000Z')

    expect(getTaipeiDateKey(beforeMidnight)).toBe('2026-07-16')
    expect(getSecondsUntilNextTaipeiDay(beforeMidnight)).toBe(1)
    expect(getTaipeiDateKey(afterMidnight)).toBe('2026-07-17')
    expect(getSecondsUntilNextTaipeiDay(afterMidnight)).toBe(86400)
  })

  it('does not hide storage failures', async () => {
    const store = new MemoryStore()
    store.set = async () => {
      throw new Error('storage unavailable')
    }

    await expect(recordPageView(store, 'visitor-a')).rejects.toThrow('storage unavailable')
  })
})
