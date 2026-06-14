import re

with open('src/components/sections/ServicesSection.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_end = """                    <Link
                      to={`/services/${service.slug}`}
                      className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:text-slate-300 dark:hover:text-[var(--brand-gold)] shrink-0"
                    >
                      Learn more
                    </Link>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-black tracking-tight text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 flex-grow">{service.description}</p>
                  <ul className="mt-6 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"""

with open('src/components/sections/ServicesSection.tsx', 'w', encoding='utf-8') as f:
    for line in lines[:57]:
        f.write(line)
    f.write(new_end)

print("Fixed ServicesSection.tsx")
