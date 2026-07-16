import { createHash, randomUUID } from 'node:crypto'
import { Redis } from '@upstash/redis'
import { createError, defineEventHandler, getCookie, setCookie } from 'h3'
import { recordPageView, type PageViewStore } from '#server/utils/page-view'

const VISITOR_COOKIE = 'resume_visitor_id'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export default defineEventHandler(async (event) => {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Page view counter is unavailable',
    })
  }

  let visitorId: string = getCookie(event, VISITOR_COOKIE) ?? ''

  if (!visitorId) {
    visitorId = randomUUID()
    setCookie(event, VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: ONE_YEAR_SECONDS,
      path: '/',
    })
  }

  const visitorHash = createHash('sha256').update(visitorId).digest('hex')

  try {
    const redis = new Redis({ url, token })
    return await recordPageView(redis as unknown as PageViewStore, visitorHash)
  }
  catch (error) {
    console.error('Page view counter failed', error)
    throw createError({
      statusCode: 503,
      statusMessage: 'Page view counter is unavailable',
    })
  }
})
