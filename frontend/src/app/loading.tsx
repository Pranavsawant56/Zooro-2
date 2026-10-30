import Spinner from "@/components/Spinner";

/**
 * Route-level loading UI. Next.js wraps every child page in a Suspense
 * boundary, so this spinner shows automatically whenever a route's data is
 * still streaming in from the server.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-brand-cream text-brand-ink">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <Spinner
          className="absolute inset-0 h-24 w-24 border-4"
          label="Loading page"
        />
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-brand-red bg-white font-display text-2xl font-extrabold text-brand-red">
          Z
        </span>
      </div>
      <p className="font-display text-sm font-bold tracking-[0.3em] text-brand-ink/60">
        LOADING
      </p>
    </div>
  );
}
