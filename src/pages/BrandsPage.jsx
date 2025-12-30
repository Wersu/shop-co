import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'

const BrandsPage = () => {
  useScrollAnimation()

  const featuredBrands = [
    {
      name: 'ArcNorth',
      focus: 'Outerwear',
      origin: 'Stockholm',
      since: '2013',
      highlight: 'Recycled shells and taped seams.',
    },
    {
      name: 'Formette',
      focus: 'Tailoring',
      origin: 'Milan',
      since: '2008',
      highlight: 'Soft structure, sharp lines, modern fits.',
    },
    {
      name: 'Vanta Studio',
      focus: 'Streetwear',
      origin: 'Seoul',
      since: '2016',
      highlight: 'Bold graphics, heavy cotton, clean silhouettes.',
    },
    {
      name: 'Marais Knit',
      focus: 'Knitwear',
      origin: 'Paris',
      since: '2011',
      highlight: 'Merino blends with color-blocked textures.',
    },
    {
      name: 'Caligo',
      focus: 'Athleisure',
      origin: 'Austin',
      since: '2014',
      highlight: 'Breathable sets built for motion.',
    },
    {
      name: 'Ridge & Co.',
      focus: 'Denim',
      origin: 'Osaka',
      since: '1999',
      highlight: 'Selvedge heritage with lived-in washes.',
    },
  ]

  const pillars = [
    {
      title: 'Material Intelligence',
      body: 'We shortlist partners with traceable mills and measurable durability.',
    },
    {
      title: 'Distinct Silhouettes',
      body: 'Every brand earns a lane, so collections never feel generic.',
    },
    {
      title: 'Seasonless Value',
      body: 'Pieces are designed for long rotation, not single-season hype.',
    },
  ]

  const sourcingSteps = [
    {
      title: 'Scout',
      detail: 'We track atelier calendars and new studio launches worldwide.',
    },
    {
      title: 'Wear Test',
      detail: 'Samples are stress-tested for 30 days across real routines.',
    },
    {
      title: 'Curate',
      detail: 'Only the top styles make the seasonal buy list.',
    },
  ]

  const brandTags = [
    'Minimal',
    'Tailored',
    'Graphic',
    'Vintage Wash',
    'Performance',
    'Luxe Knit',
    'Monochrome',
    'Utility',
  ]

  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="relative overflow-hidden bg-[#0F0F10] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute -top-10 right-6 h-44 w-44 rounded-full bg-[#F5A524]/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-16 sm:py-20 2xl:max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="scroll-hidden">
              <p className="font-accent text-sm uppercase tracking-[0.3em] text-white/70">
                Brands Atlas
              </p>
              <h1 className="title mt-4 text-4xl leading-tight sm:text-5xl">
                Discover the studios shaping our season.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/70">
                Each label is handpicked for signature silhouettes, fabric
                integrity, and a design point of view that stands on its own.
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
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:text-white"
                >
                  View catalog
                </Link>
              </div>
            </div>
            <div className="scroll-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Active brands', value: '42' },
                  { label: 'New this season', value: '9' },
                  { label: 'Global studios', value: '18' },
                  { label: 'Avg. rating', value: '4.8/5' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-5"
                  >
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Brand filters
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {brandTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 2xl:max-w-7xl">
        <div className="scroll-hidden flex flex-col gap-4">
          <h2 className="subtitle text-3xl sm:text-4xl">
            Featured brand line-up
          </h2>
          <p className="max-w-2xl text-sm text-black/60">
            From technical outerwear to modern tailoring, these teams define
            the current drop.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredBrands.map((brand) => (
            <div
              key={brand.name}
              className="scroll-hidden flex h-full flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                    {brand.focus}
                  </p>
                  <h3 className="subtitle mt-2 text-2xl">{brand.name}</h3>
                </div>
                <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
                  Since {brand.since}
                </span>
              </div>
              <p className="text-sm text-black/70">{brand.highlight}</p>
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-xs text-black/60">
                <span>Origin</span>
                <span className="font-semibold text-black">{brand.origin}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 md:grid-cols-3 2xl:max-w-7xl">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="scroll-hidden rounded-3xl border border-black/10 bg-neutral-50 p-6"
          >
            <h3 className="subtitle text-xl">{pillar.title}</h3>
            <p className="mt-3 text-sm text-black/60">{pillar.body}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto px-4 2xl:max-w-7xl">
        <div className="scroll-hidden rounded-3xl border border-black/10 bg-[#F7F3EA] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="subtitle text-3xl sm:text-4xl">
                How we choose brands
              </h2>
              <p className="mt-3 max-w-xl text-sm text-black/60">
                A focused process keeps the roster intentional and the quality
                consistent.
              </p>
            </div>
            <Link
              to="/shop/new-arrivals"
              className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              See new arrivals
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sourcingSteps.map((step, index) => (
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
    </div>
  )
}

export default BrandsPage
