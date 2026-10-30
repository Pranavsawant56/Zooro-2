"use client";

/**
 * The offline UI. Shared by the /offline route and the in-app offline overlay
 * so both look identical.
 */
export default function OfflineScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 px-6 text-center ${className}`}>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-brand-ink/10">
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12 text-brand-red"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2 8.5a16 16 0 0 1 20 0" />
          <path d="M5 12a11 11 0 0 1 14 0" />
          <path d="M8.5 15.5a6 6 0 0 1 7 0" />
          <path d="M12 19h.01" />
          <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
        </svg>
      </div>

      <div>
        <h1 className="font-display text-3xl font-extrabold text-brand-ink sm:text-4xl">
          You&rsquo;re offline
        </h1>
        <p className="mx-auto mt-3 max-w-md text-brand-ink/70">
          It looks like you&rsquo;ve lost your internet connection. Check your
          network and try again — nothing you were doing has been lost.
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-full bg-brand-red px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-red-dark"
      >
        Try again
      </button>
    </div>
  );
}
