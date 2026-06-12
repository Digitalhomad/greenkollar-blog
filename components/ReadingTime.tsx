interface ReadingTimeProps {
  minutes: number;
  className?: string;
}

export default function ReadingTime({ minutes, className = "" }: ReadingTimeProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-gray-400 text-sm ${className}`}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
      </svg>
      {minutes} min read
    </span>
  );
}
