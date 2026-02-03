import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  categorySlug: string
  tags: string[]
  thumbnail?: string
  description?: string
}

export interface Post extends PostMeta {
  content: string
}

const categoryMap: Record<string, string> = {
  routes: 'ライドルート',
  gear: '機材レビュー',
  maintenance: 'メンテナンス',
  events: 'イベント',
  training: 'トレーニング',
  beginners: '初心者ガイド',
}

const categorySlugMap: Record<string, string> = {
  'ライドルート': 'routes',
  '機材レビュー': 'gear',
  'メンテナンス': 'maintenance',
  'イベント': 'events',
  'トレーニング': 'training',
  '初心者ガイド': 'beginners',
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        category: data.category || '',
        categorySlug: categorySlugMap[data.category] || '',
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        description: data.description,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    category: data.category || '',
    categorySlug: categorySlugMap[data.category] || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    description: data.description,
    content,
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  const categoryName = categoryMap[categorySlug]
  return posts.filter((post) => post.category === categoryName)
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getCategoryName(slug: string): string {
  return categoryMap[slug] || slug
}

export function getCategorySlug(name: string): string {
  return categorySlugMap[name] || name
}
