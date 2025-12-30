import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'

const About = () => {
  useScrollAnimation()

  const stats = [
    { label: 'Curated drops', value: '38' },
    { label: 'Studio partners', value: '26' },
    { label: 'Avg. fit score', value: '4.7/5' },
    { label: 'Cities shipped', value: '54' },
  ]

  const values = [
    {
      title: 'Design with intent',
      body: 'Every collection starts with a clear point of view, not a trend.',
    },
    {
      title: 'Make it last',
      body: 'We prioritize fabrics, finishes, and tailoring that hold up.',
    },
    {
      title: 'Style without noise',
      body: 'Clean lines, strong silhouettes, and pieces that stay in rotation.',
    },
  ]

  const milestones = [
    {
      year: '2019',
      title: 'First drop',
      detail: 'A six-piece capsule that sold out in 10 days.',
    },
    {
      year: '2021',
      title: 'Global studios',
      detail: 'Partnered with makers in Seoul, Milan, and Copenhagen.',
    },
    {
      year: '2023',
      title: 'Fit lab',
      detail: 'Introduced wear testing and pattern feedback loops.',
    },
    {
      year: '2025',
      title: 'Community edit',
      detail: 'Members now vote on colorways and restocks.',
    },
  ]

  const craftSteps = [
    {
      title: 'Source',
      detail: 'We work with traceable mills and limited-run fabrications.',
    },
    {
      title: 'Prototype',
      detail: 'Each style is refined through multiple wear tests.',
    },
    {
      title: 'Balance',
      detail: 'Collections blend statement pieces with clean essentials.',
    },
  ]

  const studios = [
    'Copenhagen',
    'Seoul',
    'Lisbon',
    'London',
    'Toronto',
    'Tokyo',
    'Osaka',
    'Brooklyn',
  ]

  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="relative overflow-hidden bg-[#111214] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(215,255,63,0.18),transparent_55%)]" />
        <div className="absolute -top-16 left-8 h-40 w-40 rounded-full bg-[#D7FF3F]/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-52 w-52 rounded-full bg-white/5 blur-3xl" />
        <div className="container relative mx-auto px-4 py-16 sm:py-20 2xl:max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="scroll-hidden">
              <p className="font-accent text-xs uppercase tracking-[0.3em] text-white/60">
                About Shop.co
              </p>
              <h1 className="title mt-4 text-4xl leading-tight sm:text-5xl">
                Built for a sharper wardrobe and a slower closet.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/70">
                We curate modern essentials and directional pieces from studios
                that care about the details. The goal is simple: fewer items,
                better choices, and style that stays relevant.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Shop the edit
                </Link>
                <Link
                  to="/catalog"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
                >
                  Browse catalog
                </Link>
              </div>
            </div>
            <div className="scroll-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-5"
                  >
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Signature promise
                </p>
                <p className="mt-3 text-sm text-white/70">
                  We restock only what holds up in real wear tests, not hype
                  cycles.
                </p>
                <p className="mt-4 text-xs text-white/50">
                  Every label is reviewed every season.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] 2xl:max-w-7xl">
        <div className="scroll-hidden">
          <h2 className="subtitle text-3xl sm:text-4xl">Our story</h2>
          <p className="mt-4 text-sm text-black/60">
            Shop.co started as a tight curation list for friends looking for
            clean silhouettes and reliable quality. That list turned into a
            platform with a simple promise: only keep what earns a place in your
            rotation.
          </p>
          <div className="mt-6 rounded-3xl border border-black/10 bg-neutral-50 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Studio map
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {studios.map((studio) => (
                <span
                  key={studio}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70"
                >
                  {studio}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
            Milestones
          </p>
          <div className="mt-5 space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="rounded-2xl border border-black/10 bg-neutral-50 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                  {milestone.year}
                </p>
                <p className="subtitle mt-2 text-lg">{milestone.title}</p>
                <p className="mt-2 text-sm text-black/60">
                  {milestone.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 2xl:max-w-7xl">
        <div className="scroll-hidden flex flex-col gap-4">
          <h2 className="subtitle text-3xl sm:text-4xl">What we stand for</h2>
          <p className="max-w-2xl text-sm text-black/60">
            We design the assortment the same way you build a wardrobe: fewer
            choices, stronger pieces, no wasted space.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="scroll-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="subtitle text-xl">{value.title}</h3>
              <p className="mt-3 text-sm text-black/60">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 2xl:max-w-7xl">
        <div className="scroll-hidden rounded-3xl border border-black/10 bg-[#F7F3EA] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="subtitle text-3xl sm:text-4xl">
                How we craft each drop
              </h2>
              <p className="mt-3 max-w-xl text-sm text-black/60">
                From sourcing to fitting, our process keeps the collection tight
                and the quality consistent.
              </p>
            </div>
            <Link
              to="/shop/new-arrivals"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              Explore new arrivals
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {craftSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-black/10 bg-white p-5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="subtitle mt-3 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm text-black/60">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 2xl:max-w-7xl">
        <div className="scroll-hidden grid gap-6 rounded-3xl border border-black/10 bg-white p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="subtitle text-3xl sm:text-4xl">
              Join the community edit
            </h2>
            <p className="mt-4 text-sm text-black/60">
              We share early previews, fit notes, and styling guides with
              members. Your feedback shapes future restocks and colorways.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shop/top-selling"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
              >
                See top picks
              </Link>
              <Link
                to="/brands"
                className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
              >
                Meet the brands
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              What you get
            </p>
            <ul className="mt-4 space-y-3 text-sm text-black/70">
              {[
                'Early access to limited drops.',
                'Fit notes and care guides.',
                'Member-only restocks.',
                'Seasonal styling briefs.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
