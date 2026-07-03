import { execSync } from 'node:child_process'
import { createServer } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from 'serve-handler'
import { chromium } from 'playwright'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(rootDir, '.output/public')
const printHtml = path.join(publicDir, 'print/index.html')
const outputDir = path.join(rootDir, 'output')

const lang = process.argv.includes('--en') ? 'en' : 'zh'
const port = 3456
const outputFile = path.join(outputDir, lang === 'en' ? 'resume-en.pdf' : 'resume.pdf')

if (!fs.existsSync(printHtml)) {
  console.log('Building static site...')
  execSync('pnpm generate', { cwd: rootDir, stdio: 'inherit' })
}

if (!fs.existsSync(printHtml)) {
  throw new Error('Missing print page. Expected .output/public/print/index.html')
}

fs.mkdirSync(outputDir, { recursive: true })

const server = createServer((request, response) => {
  handler(request, response, { public: publicDir })
})

await new Promise((resolve) => {
  server.listen(port, resolve)
})

try {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    locale: lang === 'en' ? 'en-US' : 'zh-TW',
  })
  const page = await context.newPage()
  const url = `http://127.0.0.1:${port}/print/?lang=${lang}`
  const expectedName = lang === 'en' ? 'Evan Chen' : '陳冠鈞'

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.locator('.print-name').filter({ hasText: expectedName }).waitFor()
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: outputFile,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm',
    },
  })

  await browser.close()
  console.log(`Saved ${outputFile} (${lang})`)
}
finally {
  server.close()
}
