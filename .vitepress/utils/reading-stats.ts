import * as fs from 'node:fs'

const READING_SPEED = 400

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
