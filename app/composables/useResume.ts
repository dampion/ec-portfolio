import { resume, pickLocalized, type Locale } from '~~/data/resume'

export function useResume(localeOverride?: MaybeRef<Locale>) {
  const { locale } = useI18n()

  const currentLocale = computed(() => {
    if (localeOverride !== undefined) {
      return unref(localeOverride) as Locale
    }
    return locale.value as Locale
  })

  const profile = computed(() => ({
    name: pickLocalized(resume.profile.name, currentLocale.value),
    brand: resume.profile.brand,
    title: pickLocalized(resume.profile.title, currentLocale.value),
    summary: pickLocalized(resume.profile.summary, currentLocale.value),
    email: resume.profile.email,
    location: pickLocalized(resume.profile.location, currentLocale.value),
    links: resume.profile.links,
  }))

  const experience = computed(() =>
    resume.experience.map(item => ({
      company: pickLocalized(item.company, currentLocale.value),
      role: pickLocalized(item.role, currentLocale.value),
      period: item.period,
      highlights: pickLocalized(item.highlights, currentLocale.value),
    })),
  )

  const skills = computed(() => resume.skills)

  const education = computed(() =>
    resume.education.map(item => ({
      school: pickLocalized(item.school, currentLocale.value),
      degree: pickLocalized(item.degree, currentLocale.value),
      period: item.period,
    })),
  )

  const competencies = computed(() =>
    resume.competencies.map(item => ({
      title: pickLocalized(item.title, currentLocale.value),
      highlights: pickLocalized(item.highlights, currentLocale.value),
    })),
  )

  return {
    profile,
    experience,
    competencies,
    skills,
    education,
  }
}
