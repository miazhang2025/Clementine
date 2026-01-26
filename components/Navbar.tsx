import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center gap-6">
      <Link href="/" className="text-text hover:text-theme transition font-medium">Home</Link>
      <Link href="/settings/resume" className="text-text hover:text-theme transition font-medium"> Setting</Link>
    </nav>
  );
}
