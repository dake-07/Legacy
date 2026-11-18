import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const portfolioDirectory = path.resolve('public/portfolio')
const partnersDirectory = path.resolve('public/partners')

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath]
  }))
  return nested.flat()
}

async function generateVariants(sourcePath, widths) {
  const metadata = await sharp(sourcePath).metadata()

  for (const width of widths) {
    if (!metadata.width) continue

    const targetPath = sourcePath.replace(/\.[^.]+$/, `-${width}.webp`)
    const sourceModified = (await stat(sourcePath)).mtimeMs
    const targetModified = await stat(targetPath).then(info => info.mtimeMs).catch(() => 0)

    if (targetModified >= sourceModified) continue

    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 4 })
      .toFile(targetPath)

    console.log(`Generated ${path.relative(process.cwd(), targetPath)}`)
  }
}

const portfolioSources = (await listFiles(portfolioDirectory)).filter(file => /(?:gomoa-fetteh-overview|project-\d{2})\.webp$/.test(file))
const partnerSources = (await listFiles(partnersDirectory)).filter(file => /\.jpe?g$/i.test(file))

for (const sourcePath of portfolioSources) await generateVariants(sourcePath, [640, 960])
for (const sourcePath of partnerSources) await generateVariants(sourcePath, [320, 640, 960])
