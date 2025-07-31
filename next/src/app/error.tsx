"use client";
import Link from "next/link";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  const isUnauthorized = error?.message?.includes("401");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {error?.message ? (
        <>
          {isUnauthorized ? (
            <>
              <h2 className="text-2xl font-bold">Your session has expired!</h2>
              <p className="mt-2 mb-2">Please login to continue.</p>{" "}
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Error</h2>
              <p className="mt-2 mb-2">{error.message}</p>
            </>
          )}
          {reset && !isUnauthorized && (
            <button
              onClick={() => reset()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          {reset && (
            <button
              onClick={() => reset()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          )}
        </>
      )}
    </div>
  );
}
