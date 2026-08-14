import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Plus } from "lucide-react";

const pageUrl = "https://reaction-test.org/average-reaction-time/";

export const metadata: Metadata = {
  title: "Average Reaction Time: What's Normal & How to Test Yours",
  description: "What's the average reaction time for a human? See the numbers by age group, learn what's fast vs slow, and test your own reaction time for free.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Average Reaction Time: What's Normal & How to Test Yours",
    description: "See research-based reaction time estimates by age, understand fast and slow scores, and test your own response speed.",
    url: pageUrl,
    siteName: "Reaction Time",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Reaction Time Test score screen" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Reaction Time: What's Normal?",
    description: "Research-based reaction time estimates by age, plus a free test.",
    images: ["/og-image.png"]
  }
};

const ageRows = [
  ["18-24", "217 ms", "Young adult baseline"],
  ["25-34", "222 ms", "+5 ms"],
  ["35-44", "228 ms", "+11 ms"],
  ["45-54", "233 ms", "+16 ms"],
  ["55-64", "239 ms", "+22 ms"],
  ["65+", "244 ms*", "+27 ms"]
] as const;

const faqItems = [
  ["What is the average human reaction time?", "For a simple visual browser test, about 250 milliseconds is a useful practical reference. Controlled studies with calibrated hardware have reported mean simple reaction times around 231 to 238 ms, while browser and device latency can push an online result higher."],
  ["What is a good reaction time for my age?", "A result near the research-based estimate for your age is a reasonable comparison point, but the testing method matters as much as age. Compare your five-round average with repeated sessions on the same device instead of treating one number as a universal age standard."],
  ["Is 200ms a good reaction time?", "Yes. A valid 200 ms average is fast for many visual browser tests. Repeat the test over five rounds and avoid anticipating the signal, because a single unusually quick click may not represent your typical reaction time."],
  ["What is the fastest reaction time ever recorded?", "There is no single comparable world record because studies use different stimuli, devices, timing corrections, and rules. Responses below about 100 ms are often treated as anticipation in laboratory visual tests rather than a genuine response to the signal."],
  ["How can I improve my reaction time?", "Prioritize sleep, regular exercise, focused practice, and a distraction-free setup. Short sessions can improve consistency and familiarity, but an online score also includes display, browser, and input-device delay."],
  ["Does reaction time get faster with practice?", "Practice often improves consistency and task familiarity, especially during the first few sessions. Some improvement is learning the test rather than a broad change in nervous-system speed, so compare several session averages under the same conditions."]
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: "Average Reaction Time",
      description: metadata.description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      inLanguage: "en",
      image: "https://reaction-test.org/og-image.png",
      author: { "@type": "Organization", name: "Reaction Time", url: "https://reaction-test.org/" },
      publisher: { "@type": "Organization", name: "Reaction Time", url: "https://reaction-test.org/" },
      citation: [
        "https://doi.org/10.3389/fnhum.2015.00131",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC4374455/"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq-schema`,
      mainEntity: faqItems.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Reaction Time Test", item: "https://reaction-test.org/" },
        { "@type": "ListItem", position: 2, name: "Average Reaction Time", item: pageUrl }
      ]
    }
  ]
};

const sectionLinks = [
  ["age", "Average by age"],
  ["good", "Good reaction time"],
  ["fast-slow", "Fast vs. slow"],
  ["aging", "Why age matters"],
  ["test", "Test yours"],
  ["faq", "FAQ"]
] as const;

export default function AverageReactionTimePage() {
  return (
    <>
      <a href="#main" className="fixed left-3 top-3 z-50 -translate-y-24 rounded bg-marker px-4 py-2 font-bold text-ink transition-transform focus:translate-y-0">Skip to content</a>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 no-underline" aria-label="Reaction Time home">
            <span className="grid h-8 w-8 place-items-center rounded bg-ink text-xs font-black text-marker">RT</span>
            <span className="text-sm font-black uppercase">Reaction Time</span>
          </a>
          <nav aria-label="Primary navigation" className="flex items-center gap-5 text-xs font-bold text-slate-600 sm:gap-7">
            <a href="/" className="hover:text-action">Take the test</a>
            <a href="#age" className="hidden hover:text-action sm:inline">Age table</a>
            <a href="#faq" className="hover:text-action">FAQ</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <article>
          <header className="timing-grid border-b border-line px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-500">
                <a href="/" className="hover:text-action">Reaction Time Test</a><span aria-hidden="true" className="mx-2">/</span><span>Average Reaction Time</span>
              </nav>
              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-action">Research guide · Updated August 14, 2026</p>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">Average Reaction Time</h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700"><strong className="text-ink">The average reaction time for a visual browser test is about 250 milliseconds, or one quarter of a second.</strong> Young adults commonly land around 200-250 ms, while responses tend to become gradually slower with age. The exact number also depends on the screen, input device, attention, sleep, and testing method.</p>
                  <a href="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-action px-5 text-sm font-bold text-white no-underline hover:bg-blue-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-action">Test your reaction time <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
                </div>
                <aside className="border-l-4 border-marker bg-white p-6" aria-label="Key finding">
                  <p className="text-xs font-black uppercase text-slate-500">Controlled research mean</p>
                  <p className="data-number mt-3 text-5xl font-black">231<span className="ml-1 text-lg">ms</span></p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Woods et al. measured 1,469 adults aged 18-65 with calibrated hardware. Browser results may include additional device delay.</p>
                </aside>
              </div>
            </div>
          </header>

          <nav aria-label="On this page" className="border-b border-line bg-white">
            <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
              <div className="flex min-w-max gap-6 py-4 text-xs font-bold text-slate-600">
                <span className="text-ink">On this page</span>
                {sectionLinks.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-action">{label}</a>)}
              </div>
            </div>
          </nav>

          <section id="age" className="copy-section scroll-mt-6 border-b border-line bg-white py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-action">Age comparison</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Average Reaction Time by Age</h2>
                <p className="mt-5 leading-7 text-slate-600">The table translates the age regression reported by Woods et al. into readable age bands. It is not a set of directly published group means. The estimates are anchored to the study&apos;s 230.8 ms overall mean at an approximate sample age of 45.8 years and its reported increase of 0.55 ms per year.</p>
                <p className="mt-4 leading-7 text-slate-600">The study&apos;s independent replication found a similar age slope of 0.45 ms per year in adults aged 18-82. That agreement supports the direction of the estimates, but it does not turn them into a personal standard.</p>
              </div>
              <div className="min-w-0">
                <div className="overflow-x-auto border-y border-line">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <caption className="sr-only">Estimated average simple visual reaction time by age group</caption>
                    <thead><tr className="bg-paper text-xs uppercase text-slate-500"><th scope="col" className="px-4 py-4">Age group</th><th scope="col" className="px-4 py-4">Estimated mean SRT</th><th scope="col" className="px-4 py-4">Change from 18-24</th></tr></thead>
                    <tbody className="divide-y divide-line">
                      {ageRows.map(([age, value, change]) => <tr key={age}><th scope="row" className="px-4 py-4 font-bold">{age}</th><td className="data-number px-4 py-4 text-xl font-black text-action">{value}</td><td className="px-4 py-4 text-slate-600">{change}</td></tr>)}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">*The 65+ estimate uses age 70 as a representative point and is supported by the replication sample extending to age 82. These are model-based laboratory estimates, not clinical thresholds. Online scores also include hardware and browser latency.</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">Use each average reaction time estimate as research context, then track your own repeated results on the same device.</p>
              </div>
            </div>
          </section>

          <section id="good" className="copy-section scroll-mt-6 bg-paper py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <h2 className="text-3xl font-black sm:text-4xl">What Is a Good Reaction Time?</h2>
              <p className="mt-5 leading-7 text-slate-600">For most adults using a visual browser test, a repeatable result between 200 and 300 ms is a practical normal range. An average under 200 ms is fast on many setups. A score near 250 ms is close to the simple answer people usually mean when they ask about average human reaction time.</p>
              <p className="mt-4 leading-7 text-slate-600">Context matters more than a single threshold. Laboratory equipment can subtract or control display and input delay, while an online test measures the whole chain: your response, the monitor refresh, the operating system, the browser, and the mouse or touchscreen. Woods et al. found measured means of 230.8 and 237.8 ms in two carefully controlled experiments, but the same person could see a higher result in a browser.</p>
              <p className="mt-4 leading-7 text-slate-600">Claims that every professional gamer reacts below 150 ms should be treated cautiously. Results that fast can occur, but task design, anticipation rules, stimulus type, and equipment determine whether two numbers are comparable. A good reaction time is valid, consistent, and measured under repeatable conditions.</p>
            </div>
          </section>

          <section id="fast-slow" className="copy-section scroll-mt-6 border-y border-line bg-ink py-16 text-white sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">What&apos;s a Fast vs. Slow Reaction Time?</h2>
              <p className="mt-5 max-w-3xl leading-7 text-slate-300">These bands are useful for interpreting a five-round browser average, not for diagnosis. Retest under the same conditions before drawing a conclusion.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-slate-700 bg-slate-700 md:grid-cols-3">
                <div className="bg-ink p-6"><p className="data-number text-4xl font-black text-signal">&lt;200 ms</p><h3 className="mt-6 text-xl font-black">Fast</h3><p className="mt-3 text-sm leading-6 text-slate-300">A strong visual response on many browser setups. Repeat it across five valid rounds to rule out anticipation.</p></div>
                <div className="bg-ink p-6"><p className="data-number text-4xl font-black text-marker">200-300 ms</p><h3 className="mt-6 text-xl font-black">Average range</h3><p className="mt-3 text-sm leading-6 text-slate-300">Where many adults&apos; online results fall once display and input latency are included.</p></div>
                <div className="bg-ink p-6"><p className="data-number text-4xl font-black text-caution">&gt;300 ms</p><h3 className="mt-6 text-xl font-black">Slower session</h3><p className="mt-3 text-sm leading-6 text-slate-300">Fatigue, distraction, age, unfamiliarity, or device delay may contribute. One session is not a diagnosis.</p></div>
              </div>
            </div>
          </section>

          <section id="aging" className="copy-section scroll-mt-6 bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-action">What changes</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Why Reaction Time Slows With Age</h2>
                <p className="mt-5 leading-7 text-slate-600">Average reaction time usually changes gradually, not suddenly at a particular birthday. In the Woods experiments, simple reaction time increased by roughly half a millisecond per year. Over several decades that becomes noticeable, while still leaving substantial overlap between younger and older adults.</p>
              </div>
              <div className="mt-12 grid gap-10 md:grid-cols-3">
                <section><p className="data-number text-sm font-black text-action">01</p><h3 className="mt-3 text-xl font-black">Nerve conduction and signaling</h3><p className="mt-3 leading-7 text-slate-600">Signals still travel quickly, but age-related changes in sensory pathways and communication across the nervous system can add small delays. The effect varies by task and does not explain every difference between people.</p></section>
                <section><p className="data-number text-sm font-black text-action">02</p><h3 className="mt-3 text-xl font-black">Slower cognitive processing</h3><p className="mt-3 leading-7 text-slate-600">Tasks that require choosing between responses tend to show more age-related slowing than a simple one-signal task. Attention, decision-making, and inhibition add processing steps that are not isolated by a basic click test.</p></section>
                <section><p className="data-number text-sm font-black text-action">03</p><h3 className="mt-3 text-xl font-black">Reduced motor speed</h3><p className="mt-3 leading-7 text-slate-600">Woods et al. found that stimulus detection time stayed relatively stable with age. Much of the measured slowing appeared to come from the additional time needed to initiate and complete the button press.</p></section>
              </div>
              <p className="mt-10 max-w-4xl leading-7 text-slate-600">Age is only one variable. Sleep loss, alcohol, some medications, pain, stress, illness, divided attention, and unfamiliar hardware can all change a result. If reaction speed changes suddenly or causes concern in daily life, an online test cannot replace advice from a qualified health professional.</p>
            </div>
          </section>

          <section id="test" className="copy-section scroll-mt-6 border-y border-line bg-paper py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black sm:text-4xl">How to Test Your Reaction Time</h2>
                <p className="mt-5 leading-7 text-slate-600">A simple visual reaction time test waits for the screen to change color, then measures how long it takes you to click, tap, or press a key. Our test uses five valid rounds and reports the average and best result. A random delay reduces prediction, and an early click does not count.</p>
                <p className="mt-4 leading-7 text-slate-600">Use the same device when comparing sessions. Close demanding tabs, keep your attention on the test area, and rest between sets. Test your reaction time now, then compare the five-round result with the average reaction time context above rather than judging one lucky attempt.</p>
              </div>
              <a href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-action px-6 text-sm font-bold text-white no-underline hover:bg-blue-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-action">Start the reaction time test <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </section>

          <section id="faq" className="faq copy-section scroll-mt-6 bg-white py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-action">Quick answers</p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">Average Reaction Time FAQ</h2>
                <p className="mt-5 text-sm leading-6 text-slate-600">Short answers about normal scores, practice, age, and testing.</p>
              </div>
              <div className="border-t border-line">
                {faqItems.map(([question, answer]) => <details className="group border-b border-line py-5" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold"><span>{question}</span><Plus aria-hidden="true" className="faq-plus h-5 w-5 shrink-0 text-action transition-transform" /></summary><p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{answer}</p></details>)}
              </div>
            </div>
          </section>

          <section className="copy-section border-t border-line bg-paper py-14" aria-labelledby="sources-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 id="sources-title" className="text-xl font-black">Sources and Data Method</h2>
              <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">Primary source: Woods, Wyma, Yund, Herron, and Reed (2015), <em>Factors influencing the latency of simple reaction time</em>, <em>Frontiers in Human Neuroscience</em>, 9:131. Experiment 1 measured 1,469 adults aged 18-65 and reported a 230.8 ms mean with an age slope of 0.55 ms/year. Experiment 2 measured 189 adults aged 18-82 and reported a 237.8 ms mean with an age slope of 0.45 ms/year. The age-band estimates on this page are rounded calculations from the Experiment 1 mean and regression slope, not direct subgroup means published by the authors.</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm font-bold">
                <a href="https://doi.org/10.3389/fnhum.2015.00131" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-action">DOI record <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4374455/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-action">Read the full study <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
              </div>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-line bg-ink py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div><a href="/" className="font-black uppercase text-white no-underline">Reaction Time</a><p className="mt-2 text-xs text-slate-400">Research context for a free browser-based reaction test. Not a medical assessment.</p></div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} reaction-test.org</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
