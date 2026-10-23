import Link from 'next/link';

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">LEOZ GENTS SALON · 404</p><h1>A different<br />direction.</h1><p>This page isn’t part of the Leoz preview.</p><Link href="/" className="button">Back to the den</Link></main>;
}
