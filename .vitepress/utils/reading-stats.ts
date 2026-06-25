import * as fs from 'node:fs'
import * as path from 'node:path'

const READING_SPEED = 400
const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  '.git',
  '.vitepress',
  'dist',
  'public',
  '.github'
])

function stripFrontmatter(content: string) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

function stripMarkdownForReadingStats(content: string) {
  return stripFrontmatter(content)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, ' $1 ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/`([^`]+)`/g, ' $1 ')
    .replace(/\$([^$\n]+)\$/g, ' $1 ')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*\|/gm, '')
    .replace(/:::\s?.*$/gm, ' ')
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    .replace(/\r?\n+/g, ' ')
    .trim()
}

export function getReadingStats(content: string) {
  const cleaned = stripMarkdownForReadingStats(content)
  const cjkCount = (cleaned.match(/[\u3400-\u9fff]/g) ?? []).length
  const wordCount =
    cjkCount +
    (cleaned
      .replace(/[\u3400-\u9fff]/g, ' ')
      .match(/[A-Za-z0-9]+(?:[-_'][A-Za-z0-9]+)*/g) ?? []).length

  return {
    wordCount,
    readingTime: Math.max(1, Math.ceil(wordCount / READING_SPEED))
  }
}

export function getReadingStatsFromFile(filePath: string) {
  if (!fs.existsSync(filePath)) return null

  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return getReadingStats(rawContent)
}

export function getTotalWordCount(rootDir: string) {
  let totalWordCount = 0

  const walk = (currentDir: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) continue

        walk(path.join(currentDir, entry.name))
        continue
      }

      if (!entry.isFile() || !entry.name.endsWith('.md')) continue

      const filePath = path.join(currentDir, entry.name)
      const stats = getReadingStatsFromFile(filePath)

      if (stats) {
        totalWordCount += stats.wordCount
      }
    }
  }

  walk(rootDir)

  return totalWordCount
}
