export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-mint-300">404</p>
        <p className="mt-4 text-lg text-haze-300">Page not found · Página no encontrada</p>
        <a href="/" className="mt-8 inline-block rounded-md bg-mint-400 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-mint-300">
          Home
        </a>
      </div>
    </div>
  );
}
