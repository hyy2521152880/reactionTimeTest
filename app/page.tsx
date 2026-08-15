import { ArrowDown, ArrowRight, ExternalLink, Plus } from "lucide-react";
import { ReactionTest } from "@/components/reaction-test";

const faqItems = [
  ["What is the average reaction time?", "Many people record visual reaction times between roughly 200 and 300 milliseconds in browser-based tests. The result depends on the person, input device, display, browser, and test method, so it is better treated as a comparison range than a universal norm."],
  ["Is a 200 ms reaction time fast?", "A 200 ms result is fast for many online visual tests. One attempt can be unusually quick, so use the average of five valid rounds and repeat the test under the same conditions before drawing a conclusion."],
  ["Can reaction time improve?", "Practice can improve familiarity, attention, and consistency. Sleep, regular physical activity, and reduced distraction also matter. Training does not remove hardware latency, and gains in this simple task may not transfer directly to every sport or game."],
  ["Does reaction time change with age?", "Reaction time can change across the lifespan, but age is only one influence. Sleep, health, attention, experience, and the testing device can all affect a score. This page does not diagnose age-related or cognitive conditions."],
  ["Why is my score different each time?", "Small changes are expected. Your attention shifts between rounds, the random delay changes, and the browser may process input at slightly different moments. That is why the tool reports a five-round average instead of judging one click."],
  ["Does the reaction test work on mobile?", "Yes. The test uses pointer input and works on phones, tablets, trackpads, and mice. Touchscreen processing can add different latency than a wired mouse, so compare mobile results with other results from the same device."],
  ["Is a mouse faster than a touchscreen?", "Often, but not always. Input hardware, operating-system processing, display refresh rate, and browser scheduling all contribute to total delay. A fast gaming mouse and high-refresh display usually provide a cleaner measurement setup."],
  ["How accurate is an online reaction time test?", "The timer uses the browser's high-resolution performance clock, but it cannot remove display and input latency. It is useful for repeated personal comparisons, not as a laboratory measurement or medical assessment."]
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://reaction-test.org/#website",
      url: "https://reaction-test.org/",
      name: "Reaction Time",
      inLanguage: "en"
    },
    {
      "@type": "WebApplication",
      "@id": "https://reaction-test.org/#app",
      name: "Reaction Time Test",
      url: "https://reaction-test.org/",
      description: "A free five-round online reaction test that measures reaction time in milliseconds.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Reaction Time Test",
      operatingSystem: "Any",
      browserRequirements: "JavaScript enabled",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: ["Five-round reaction time test", "Average and best reaction time", "Desktop and mobile support"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://reaction-test.org/#faq",
      url: "https://reaction-test.org/#faq",
      mainEntity: faqItems.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text }
      }))
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <a href="#main" className="fixed left-3 top-3 z-50 -translate-y-24 rounded bg-marker px-4 py-2 font-bold text-ink transition-transform focus:translate-y-0">Skip to test</a>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 no-underline" aria-label="Reaction Time home">
            <span className="grid h-8 w-8 place-items-center rounded bg-ink text-xs font-black text-marker">RT</span>
            <span className="text-sm font-black uppercase">Reaction Time</span>
          </a>
          <nav aria-label="Primary navigation" className="flex gap-5 text-xs font-bold text-slate-600 sm:gap-7">
            <a href="#score-guide" className="hover:text-action">Score guide</a>
            <a href="/reflex-test/" className="hidden hover:text-action sm:inline">Reflex test</a>
            <a href="#faq" className="hover:text-action">FAQ</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="timing-grid border-b border-line px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl text-center sm:text-left lg:mb-10">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.1em] text-action">Five valid rounds. One reliable average.</p>
              <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">Reaction Time Test</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mx-0">Take this free online reaction test to measure how quickly you respond when the screen turns green. Complete five valid attempts to see your average and best reaction time in milliseconds.</p>
            </div>
            <div className="lg:ml-10"><ReactionTest /></div>
            <a href="#score-guide" className="mx-auto mt-6 flex w-fit items-center gap-2 text-xs font-bold text-slate-600 no-underline hover:text-action">Understand your score <ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
          </div>
        </section>

        <section id="score-guide" className="copy-section border-b border-line bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="min-w-0">
              <p className="text-sm font-bold text-action">Read the result</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Understand Your Reaction Test Result</h2>
              <p className="mt-5 leading-7 text-slate-600">Your five-round average is more useful than a single lucky click. The best attempt shows your fastest valid response, while the spread between attempts indicates consistency. Compare sessions only when you use similar hardware and conditions.</p>
              <h3 className="mt-10 text-xl font-black">Why Device Latency Matters</h3>
              <p className="mt-3 leading-7 text-slate-600">An online reaction time test measures the combined delay from your nervous system, display, input device, operating system, and browser. A touchscreen, wireless mouse, 60 Hz display, or busy tab can add time. The tool is best for tracking yourself on the same setup.</p>
            </div>
            <div className="min-w-0">
              <h3 className="mb-4 text-xl font-black">Reaction Time Score Guide</h3>
              <div className="overflow-x-auto border-y border-line">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead><tr className="bg-paper text-xs uppercase text-slate-500"><th className="px-4 py-3">Browser result</th><th className="px-4 py-3">Band</th><th className="px-4 py-3">Interpretation</th></tr></thead>
                  <tbody className="divide-y divide-line">
                    <tr><td className="data-number px-4 py-4 font-bold">Under 180 ms</td><td className="px-4 py-4 font-bold">Exceptional</td><td className="px-4 py-4 text-slate-600">Unusually fast; repeat to rule out anticipation.</td></tr>
                    <tr><td className="data-number px-4 py-4 font-bold">180–219 ms</td><td className="px-4 py-4 font-bold">Fast</td><td className="px-4 py-4 text-slate-600">A quick visual response on many setups.</td></tr>
                    <tr><td className="data-number px-4 py-4 font-bold">220–279 ms</td><td className="px-4 py-4 font-bold">Typical</td><td className="px-4 py-4 text-slate-600">A common browser-test result.</td></tr>
                    <tr><td className="data-number px-4 py-4 font-bold">280–349 ms</td><td className="px-4 py-4 font-bold">Developing</td><td className="px-4 py-4 text-slate-600">Retest rested and without distractions.</td></tr>
                    <tr><td className="data-number px-4 py-4 font-bold">350 ms or more</td><td className="px-4 py-4 font-bold">Retest</td><td className="px-4 py-4 text-slate-600">Fatigue or device delay may be involved.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">These bands are practical browser-test guidance, not clinical norms. They should not be used to diagnose a medical or cognitive condition.</p>
            </div>
          </div>
        </section>

        <section className="copy-section bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-black sm:text-4xl">What Is a Reaction Time Test?</h2>
            <p className="mt-5 leading-7 text-slate-600">A reaction time test measures the delay between a stimulus and your response. In this test, the stimulus is a color change and the response is a click, tap, or key press. The result is reported in milliseconds, where 1,000 milliseconds equal one second. Researchers use controlled versions of this task to study attention and information processing, while players and athletes often use simpler online versions to practice focus and compare sessions.</p>
            <p className="mt-4 leading-7 text-slate-600">The number on this page is not pure biological reaction time. It also includes the time required for your display to show green and for the device to register input. That limitation does not make the test useless. A consistent setup still provides a convenient way to compare your own reaction speed over time.</p>
            <h3 className="mt-10 text-xl font-black">Simple vs. Choice Reaction Time</h3>
            <p className="mt-3 leading-7 text-slate-600">This is a simple visual reaction test: one signal requires one response. A choice reaction test presents several signals and requires a different response for each one. Choice tasks are usually slower because the brain must identify the stimulus, select a response, and then act. Results from the two formats should not be compared directly.</p>
          </div>
        </section>

        <section id="how-it-works" className="copy-section border-y border-line bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">How Does This Reaction Test Work?</h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-600">The reaction test uses a random wait to make anticipation harder. Only clicks after the green signal count. Five valid rounds balance speed with consistency and reduce the influence of one unusually fast or slow attempt.</p>
            <ol className="mt-10 grid border-y border-line md:grid-cols-3">
              <li className="relative py-7 md:pr-8"><span className="data-number text-sm font-black text-action">01</span><h3 className="mt-4 text-lg font-black">Wait for the Screen to Turn Green</h3><p className="mt-3 text-sm leading-6 text-slate-600">Start a round and keep your pointer or finger ready. The waiting period changes each time. Clicking during red creates a false start and the attempt is discarded.</p></li>
              <li className="relative border-t border-line py-7 md:border-l md:border-t-0 md:px-8"><span className="data-number text-sm font-black text-signal">02</span><h3 className="mt-4 text-lg font-black">Click as Fast as You Can</h3><p className="mt-3 text-sm leading-6 text-slate-600">Respond once the surface turns green and says Click. The browser uses its high-resolution performance clock to calculate elapsed time.</p></li>
              <li className="relative border-t border-line py-7 md:border-l md:border-t-0 md:pl-8"><span className="data-number text-sm font-black text-caution">03</span><h3 className="mt-4 text-lg font-black">Complete Five Valid Rounds</h3><p className="mt-3 text-sm leading-6 text-slate-600">Each valid result appears in the attempt rail. After round five, the test calculates your average, fastest attempt, and practical score band.</p></li>
            </ol>
          </div>
        </section>

        <section className="copy-section border-y border-line bg-paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">What Is a Good Reaction Time?</h2>
              <p className="mt-5 leading-7 text-slate-600">A good reaction time is a repeatable result produced without guessing. Around 200 milliseconds is fast for many browser tests, but the correct comparison depends on the task and equipment. A racing start, laboratory button box, touchscreen tap, and gaming mouse do not measure the exact same chain of events.</p>
              <p className="mt-4 leading-7 text-slate-600">Treat your first session as a baseline. Repeat the five-round test on the same device at similar times of day. Improvement is more convincing when the average becomes faster and the results become less variable across several sessions.</p>
            </div>
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">Average Reaction Time and What Affects It</h2>
              <h3 className="mt-6 text-lg font-black text-action">Age, Sleep, and Attention</h3>
              <p className="mt-3 leading-7 text-slate-600">Age can influence reaction time, but sleep loss, divided attention, stress, medication, alcohol, and recent practice also matter. See our research-based guide to <a href="/average-reaction-time/" className="font-bold text-action">average reaction time by age</a> before comparing your score.</p>
              <h3 className="mt-6 text-lg font-black text-action">Mouse, Touchscreen, and Display Delay</h3>
              <p className="mt-3 leading-7 text-slate-600">Displays update in frames, and input devices report at different rates. For fair comparisons, keep the same browser, display, and input device, close demanding tabs, and avoid switching between touch and mouse results.</p>
            </div>
          </div>
        </section>

        <section className="copy-section border-b border-line bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">How to Improve Your Reaction Time</h2>
              <p className="mt-5 leading-7 text-slate-600">Short, focused practice is more useful than repeatedly clicking while tired. Begin with two or three five-round sessions, then stop. Regular aerobic exercise, sufficient sleep, hydration, and fewer distractions support attention and motor performance. Follow the complete guide on <a href="/how-to-increase-reaction-time/" className="font-bold text-action">how to increase reaction time</a> for a repeatable weekly plan.</p>
              <h3 className="mt-8 text-xl font-black">Practice for Consistency</h3>
              <p className="mt-3 leading-7 text-slate-600">Try to reduce the spread between attempts before chasing a record. Use the same posture and input device, look at the center of the test surface, and avoid timing the random delay. Predicting the signal may create a fast number, but it does not represent a valid response.</p>
              <h3 className="mt-8 text-xl font-black">Recover Before You Retest</h3>
              <p className="mt-3 leading-7 text-slate-600">Reaction speed is sensitive to fatigue. A rested baseline is more useful than a personal best recorded after dozens of attempts. Compare weekly averages under similar conditions rather than judging yourself by one session.</p>
            </div>
            <aside className="border-l-4 border-marker bg-paper p-6 sm:p-8" aria-labelledby="sports-title">
              <h2 id="sports-title" className="text-2xl font-black">Reaction Time in Gaming and Sports</h2>
              <p className="mt-5 leading-7 text-slate-600">Fast responses matter in competitive games, racquet sports, goalkeeping, and driving, but real performance includes anticipation, decision-making, movement accuracy, and context. A simple reaction time test isolates only one small part of that system.</p>
              <p className="mt-4 leading-7 text-slate-600">Use this tool as a warm-up or personal benchmark. It cannot predict match performance, driving safety, neurological health, or fitness for a job.</p>
            </aside>
          </div>
        </section>

        <section className="copy-section border-b border-line bg-paper py-16 sm:py-24" aria-labelledby="explore-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-bold text-action">Reaction time library</p>
            <h2 id="explore-title" className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Test, Compare, and Train Your Response Speed</h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-600">Choose the next step based on what you want to learn. Every guide uses the same measurement limits: online scores include your display, browser, and input device.</p>
            <div className="mt-10 divide-y divide-line border-y border-line">
              <a href="/average-reaction-time/" className="group grid gap-3 py-6 no-underline sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-8"><span className="font-black">Average Reaction Time</span><span className="text-sm leading-6 text-slate-600">Compare your result with research-based age estimates and practical browser ranges.</span><ArrowRight aria-hidden="true" className="h-5 w-5 text-action transition-transform group-hover:translate-x-1" /></a>
              <a href="/reflex-test/" className="group grid gap-3 py-6 no-underline sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-8"><span className="font-black">Reflex Test</span><span className="text-sm leading-6 text-slate-600">Try a five-round visual reflex tester and understand reflex speed.</span><ArrowRight aria-hidden="true" className="h-5 w-5 text-action transition-transform group-hover:translate-x-1" /></a>
              <a href="/how-to-increase-reaction-time/" className="group grid gap-3 py-6 no-underline sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-8"><span className="font-black">How to Increase Reaction Time</span><span className="text-sm leading-6 text-slate-600">Build a short practice plan around sleep, exercise, focus, and valid testing.</span><ArrowRight aria-hidden="true" className="h-5 w-5 text-action transition-transform group-hover:translate-x-1" /></a>
            </div>
          </div>
        </section>

        <section id="faq" className="faq copy-section bg-paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold text-action">Quick answers</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-5 text-sm leading-6 text-slate-600">How to interpret and compare an online reaction time result.</p>
            </div>
            <div className="border-t border-line">
              {faqItems.map(([question, answer]) => (
                <details className="group border-b border-line py-5" key={question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold"><span>{question}</span><Plus aria-hidden="true" className="faq-plus h-5 w-5 shrink-0 text-action transition-transform" /></summary>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="copy-section border-t border-line bg-white py-14" aria-labelledby="method-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="method-title" className="text-xl font-black">Sources and Testing Methodology</h2>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">Timing begins after the interface enters its green state and ends on pointer or keyboard activation, using <code className="rounded bg-paper px-1 py-0.5">performance.now()</code>. Results include browser and hardware latency. Background-tab interruptions invalidate the active round. For research context, see Woods et al., “Factors influencing the latency of simple reaction time” in <em>Frontiers in Human Neuroscience</em>.</p>
            <a href="https://doi.org/10.3389/fnhum.2015.00131" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-action">Read the cited study <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div><p className="font-black uppercase">Reaction Time</p><p className="mt-2 text-xs text-slate-400">A free browser-based reaction test. Not a medical assessment.</p></div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} reaction-test.org</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
