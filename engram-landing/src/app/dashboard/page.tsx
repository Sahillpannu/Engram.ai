export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <h1 className="text-[32px] font-semibold tracking-tight text-ink">
        Dashboard
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-muted">
        This is a stub dashboard page. Real authentication and workspace content
        will be wired up here.
      </p>
      <a
        href="/login"
        className="mt-8 text-[14px] text-accent transition-colors hover:text-accent-hover"
      >
        Back to login
      </a>
    </div>
  );
}
