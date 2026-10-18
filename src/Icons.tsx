import type { SVGProps } from 'react';

type IconName = 'arrow' | 'down' | 'carrot' | 'flower' | 'hills' | 'heart' | 'download' | 'plus' | 'check';

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  down: <><path d="M12 4v16M6 14l6 6 6-6" /></>,
  carrot: <><path d="m14.5 7.5 2 2c2.5 2.5-1 5.5-11.8 10.8a.7.7 0 0 1-1-1C9 8.5 12 5 14.5 7.5Z" /><path d="m15.5 8.5 4-4M18.5 8.5l3-1M15.5 5.5l1-3M9 13l2 2M12 9l2 2" /></>,
  flower: <><path d="M12 7c-5-8-11 1-4 4-8 4-1 12 4 5 5 7 12-1 4-5 7-3 1-12-4-4Z" /><circle cx="12" cy="11.5" r="2" /><path d="M12 17v5" /></>,
  hills: <><path d="m2 18 7-12 7 12M12 12l3-5 7 11M6 11l3 2 3-2M2 21h20" /></>,
  heart: <path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.9a5.3 5.3 0 0 0 0-7.5Z" />,
  download: <><path d="M12 3v12M7 10l5 5 5-5M4 16v4h16v-4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

export function GoatMark({ className }: { className?: string }) {
  return <svg className={className} width="38" height="40" viewBox="0 0 38 40" fill="none" aria-hidden="true">
    <path d="M12 12C6 7 8 3 11 2c-1 4 3 5 5 8M26 12c6-5 4-9 1-10 1 4-3 5-5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m12 14-9-2c-1 7 5 9 9 6m14-4 9-2c1 7-5 9-9 6" fill="currentColor" />
    <path d="M11 16c0-6 16-6 16 0l-2 13c-1 5-11 5-12 0l-2-13Z" fill="currentColor" />
    <path d="m16 31 3 7 3-7" fill="currentColor" />
    <path d="M15 20h1m6 0h1" stroke="var(--color-page, #f6f4e9)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="m17 27 2 1 2-1" stroke="var(--color-page, #f6f4e9)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;
}
