import type { SVGProps } from 'react'

const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  diagonal: 'M5 19 19 5M5 5h14v14',
  left: 'M20 12H4m6-6-6 6 6 6',
  down: 'm6 9 6 6 6-6',
  menu: 'M4 8h16M4 16h16',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12 4 4L19 6',
  area: 'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M4 4l6 6m4 4 6 6',
  bed: 'M3 18V8m18 10V8M3 14h18M5 10V6h14v4M3 18v3m18-3v3M4 10h16a1 1 0 0 1 1 1v7H3v-7a1 1 0 0 1 1-1',
  car: 'm5 8 2-4h10l2 4M4 8h16v9H4zM6 17v3m12-3v3M7 12h1m8 0h1',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  search: 'M21 21l-6-6M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  copy: 'M9 9h11v12H9zM15 9V3H3v12h6',
  share: 'M12 16V3m-5 5 5-5 5 5M5 13v8h14v-8',
  print: 'M6 9V3h12v6M6 17H3V9h18v8h-3M6 14h12v7H6zM17 11h1',
  compass: 'm16 8-3 5-5 3 3-5 5-3ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  chart: 'M4 3v17h17M7 15l5-5 4 2 5-7',
  layers: 'm12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',
  shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm-5 10 3 3 7-7',
  whatsapp:
    'M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1ZM8.4 7.5c.3-.2.8-.2 1 .3l.8 1.5c.1.4-.1.7-.6 1.1.8 1.6 1.9 2.6 3.5 3.3.4-.5.7-1 1.1-.8l1.6.8c.5.2.5.7.2 1.2-.5.9-1.3 1.2-2.4.9-3.6-1-6.3-3.8-6.8-6.3-.2-1 .5-1.6 1.6-2Z',
} as const

export type IconName = keyof typeof paths
export function Icon({
  name,
  className = 'size-5',
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}
