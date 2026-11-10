'use client'

import { useMemo, useState } from 'react'
import type { Article, Category } from '@/payload-types'
import { ArticleCard, categoryOf } from './cards'
import { Icon } from './icons'

const tones: Record<string, string> = {
  navy: 'bg-navy',
  olive: 'bg-[#7b8263]',
  sand: 'bg-[#b5a58b]',
  slate: 'bg-[#70858e]',
  terracotta: 'bg-[#a97860]',
  sage: 'bg-[#7b9485]',
  gold: 'bg-gold-dark',
}

export function EditorialFeed({
  articles,
  categories,
}: {
  articles: Article[]
  categories: Category[]
}) {
  const [category, setCategory] = useState<string | number>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent')
  const [visible, setVisible] = useState(6)
  const results = useMemo(() => {
    const normal = (value: string) =>
      value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
    return articles
      .filter(
        (article) =>
          (category === 'all' || String(categoryOf(article)?.id) === String(category)) &&
          normal(
            `${article.title} ${article.subtitle} ${categoryOf(article)?.name || ''}`,
          ).includes(normal(query)),
      )
      .sort((a, b) =>
        sort === 'short'
          ? (a.readingTime || 5) - (b.readingTime || 5)
          : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
  }, [articles, category, query, sort])
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5" aria-label="Categorias editoriais">
        <button
          onClick={() => {
            setCategory('all')
            setVisible(6)
          }}
          aria-pressed={category === 'all'}
          className={`min-h-10 border px-4 py-2.5 text-[10px] transition-colors ${category === 'all' ? 'border-navy bg-navy text-white' : 'border-line text-muted hover:border-navy'}`}
        >
          Todas as perspectivas
        </button>
        {categories.map((item) => (
          <button
            key={String(item.id)}
            aria-pressed={category === item.id}
            onClick={() => {
              setCategory(item.id)
              setVisible(6)
            }}
            className={`flex min-h-10 items-center gap-2 border px-3.5 py-2.5 text-[10px] transition-colors ${category === item.id ? 'border-navy bg-navy text-white' : 'border-line text-muted hover:border-navy'}`}
          >
            <span
              className={`size-1 rounded-full ${category === item.id ? 'bg-champagne-light' : tones[item.tone || 'navy']}`}
            />
            {item.name}
          </button>
        ))}
      </div>
      {category !== 'all' && (
        <p className="mb-7 max-w-2xl border-l border-champagne pl-5 font-display text-2xl leading-relaxed text-muted">
          {categories.find((item) => String(item.id) === String(category))?.description}
        </p>
      )}
      <div className="mb-9 flex flex-col justify-between gap-5 border-y border-line py-4 sm:flex-row sm:items-center">
        <label className="flex items-center gap-3">
          <Icon name="search" className="size-4 text-gold-dark" />
          <input
            aria-label="Buscar na revista"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisible(6)
            }}
            placeholder="Encontre uma nova perspectiva"
            className="w-full min-w-[250px] bg-transparent py-2 text-[11px] outline-none"
          />
        </label>
        <div className="flex items-center justify-between gap-5">
          <p className="text-[9px] text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'publicação' : 'publicações'}
          </p>
          <select
            aria-label="Ordenar artigos"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="bg-transparent py-2 pr-3 text-[10px] text-navy"
          >
            <option value="recent">Mais recentes</option>
            <option value="short">Leitura breve</option>
          </select>
        </div>
      </div>
      {results.length ? (
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, visible).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h3 className="font-display text-3xl">Um novo assunto, um novo olhar.</h3>
          <p className="mt-4 text-xs text-muted">Não encontramos publicações para esta busca.</p>
          <button
            onClick={() => {
              setQuery('')
              setCategory('all')
            }}
            className="mt-6 border-b border-champagne py-2 text-xs"
          >
            Limpar filtros
          </button>
        </div>
      )}
      {results.length > visible && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((value) => value + 6)}
            className="group inline-flex min-h-12 items-center gap-8 border border-navy/30 px-7 py-3 text-[11px] transition-colors hover:bg-navy hover:text-white"
          >
            Mais perspectivas
            <Icon name="plus" className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
