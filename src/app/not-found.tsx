import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">Page not found</p>
        <Link href="/" passHref>
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
