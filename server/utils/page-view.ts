const TOTAL_KEY = 'resume:page-view:total'
const INITIAL_COUNT = 35
const DEDUPE_PREFIX = 'resume:page-view:daily'
const TAIPEI_OFFSET_MS = 8 * 60 * 60 * 1000

interface SetOptions {
  nx?: boolean
  ex?: number
}

export interface PageViewStore {
  set: (key: string, value: string | number, options?: SetOptions) => Promise<'OK' | null>
  get: <T>(key: string) => Promise<T | null>
  incr: (key: string) => Promise<number>
}

export interface RecordedPageView {
  count: number
  counted: boolean
}

export function getTaipeiDateKey(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function getSecondsUntilNextTaipeiDay(now = new Date()) {
  const dateParts = getTaipeiDateKey(now).split('-').map(Number)
  const year = dateParts[0]!
  const month = dateParts[1]!
  const day = dateParts[2]!
  const nextMidnightUtc = Date.UTC(year, month - 1, day + 1) - TAIPEI_OFFSET_MS

  return Math.max(1, Math.ceil((nextMidnightUtc - now.getTime()) / 1000))
}

export async function recordPageView(
  store: PageViewStore,
  visitorHash: string,
  now = new Date(),
): Promise<RecordedPageView> {
  await store.set(TOTAL_KEY, INITIAL_COUNT, { nx: true })

  const dedupeKey = `${DEDUPE_PREFIX}:${getTaipeiDateKey(now)}:${visitorHash}`
  const stored = await store.set(dedupeKey, 1, {
    nx: true,
    ex: getSecondsUntilNextTaipeiDay(now),
  })

  if (stored === 'OK') {
    return {
      count: await store.incr(TOTAL_KEY),
      counted: true,
    }
  }

  const count = await store.get<number>(TOTAL_KEY)

  return {
    count: count ?? INITIAL_COUNT,
    counted: false,
  }
}
