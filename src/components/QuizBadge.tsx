/** Original vector emblems: clay, bronze, silver, gold, crown, stylized cherub. */
export default function QuizBadge({ tier, label, large = false }: { tier: number; label: string; large?: boolean }) {
  const colors = ['#b58a65', '#cf8953', '#d3e0ee', '#f2c453', '#efcf78', '#d9eeff'];
  return <svg role="img" aria-label={label} viewBox="0 0 48 48" width={large ? 72 : 34} height={large ? 72 : 34} className="shrink-0" style={{ color: colors[tier] }}>
    <title>{label}</title>
    <circle cx="24" cy="24" r="22" fill="currentColor" opacity=".08" />
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {tier === 0 ? <><path d="M18 10h12l-3 7c9 5 10 17 3 21H18c-7-4-6-16 3-21z" fill="currentColor" fillOpacity=".2" /><path d="M15 28h18M17 33h14M20 13h8" /></> : tier < 4 ? <>
        <path d="M15 11h18v9c0 7-4 11-9 11s-9-4-9-11z" fill="currentColor" fillOpacity=".2" />
        <path d="M15 14H9v5c0 5 3 7 8 7m16-12h6v5c0 5-3 7-8 7M24 31v7m-7 2h14" />
        {tier >= 2 && <path d="m24 15 2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" fill="currentColor" />}
        {tier === 3 && <path d="m7 30 3 4 4 2m27-6-3 4-4 2M24 4v3M8 7l3 3m29-3-3 3" />}
      </> : tier === 4 ? <><path d="m9 15 8 8 7-13 7 13 8-8-4 20H13z" fill="currentColor" fillOpacity=".25" /><path d="M14 39h20M18 29h12" /><circle cx="24" cy="6" r="2" fill="currentColor" /></> : <>
        <ellipse cx="24" cy="8" rx="6" ry="2" /><circle cx="24" cy="17" r="4" fill="currentColor" fillOpacity=".35" />
        <path d="M20 24C13 23 7 17 4 10c-1 12 4 20 14 22M28 24c7-1 13-7 16-14 1 12-4 20-14 22M18 27c-4 3-8 4-12 3 3 7 8 9 14 6m10-9c4 3 8 4 12 3-3 7-8 9-14 6M24 23l-7 17h14z" fill="currentColor" fillOpacity=".12" />
        <path d="m9 20 8 7m22-7-8 7M21 43h6" />
      </>}
    </g>
  </svg>;
}
