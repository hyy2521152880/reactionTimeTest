import type { Metadata } from "next";

const pageUrl = "https://reaction-test.org/privacy/";

export const metadata: Metadata = {
  title: "Privacy Policy | Reaction Time",
  description: "How Reaction Time handles analytics, local test history, and shared score images.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Privacy Policy | Reaction Time",
    description: "How Reaction Time handles analytics, local test history, and shared score images.",
    url: pageUrl,
    siteName: "Reaction Time",
    type: "website"
  }
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 no-underline" aria-label="Reaction Time home">
            <span className="grid h-8 w-8 place-items-center rounded bg-ink text-xs font-black text-marker">RT</span>
            <span className="text-sm font-black uppercase">Reaction Time</span>
          </a>
          <a href="/" className="text-xs font-bold text-action hover:underline">Take the test</a>
        </div>
      </header>
      <main className="timing-grid border-b border-line px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-action">Privacy</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 leading-7 text-slate-600">Last updated: August 15, 2026</p>
          <section className="mt-12 space-y-8 text-slate-700">
            <div><h2 className="text-2xl font-black text-ink">What we collect</h2><p className="mt-3 leading-7">Reaction Time does not require an account and does not ask for your name, email address, or payment information. The test records anonymous events such as a test start, completion, false start, share action, and the numeric result needed to understand site performance.</p></div>
            <div><h2 className="text-2xl font-black text-ink">Analytics</h2><p className="mt-3 leading-7">We use Google Analytics and Microsoft Clarity to understand page visits, navigation, and aggregate interaction patterns. These services may set cookies or use similar technologies according to their own policies. We use the information to improve the site, not to identify individual visitors.</p></div>
            <div><h2 className="text-2xl font-black text-ink">Local test history</h2><p className="mt-3 leading-7">Recent test results are stored in your browser&apos;s local storage so the results panel can show personal history. This data stays in your browser unless you clear site data. We do not use it to create an account or send it to a server.</p></div>
            <div><h2 className="text-2xl font-black text-ink">Score sharing</h2><p className="mt-3 leading-7">When you choose to share a score, the browser creates a 1200 by 630 pixel image locally. You decide whether to download it or share it through your device&apos;s supported sharing service. Reaction Time does not receive the image.</p></div>
            <div><h2 className="text-2xl font-black text-ink">Third-party services and advertising</h2><p className="mt-3 leading-7">The site may use third-party analytics and, when enabled, advertising services such as Google AdSense. Those providers may process information under their own privacy policies and may use cookies where legally permitted. Any advertising will be clearly separated from the test and editorial content.</p></div>
            <div><h2 className="text-2xl font-black text-ink">Contact</h2><p className="mt-3 leading-7">For privacy questions or requests, contact the site owner through the current contact method listed with the domain registration or hosting account.</p></div>
          </section>
        </article>
      </main>
      <footer className="border-t border-line bg-ink py-10 text-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 sm:px-6"><a href="/" className="font-black uppercase text-white no-underline">Reaction Time</a><p className="text-xs text-slate-400">© {new Date().getFullYear()} reaction-test.org</p></div></footer>
    </>
  );
}
