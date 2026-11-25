interface StudyPlanEntry {
  name: string;
  slug: string;
}

const builtInPlans: readonly StudyPlanEntry[] = [
  { name: 'Top Interview 150', slug: 'top-interview-150' },
  { name: 'LeetCode 75', slug: 'leetcode-75' },
];

export function getStudyPlanEntries(configuredPlans: unknown): StudyPlanEntry[] {
  const plans = [...builtInPlans];
  if (!Array.isArray(configuredPlans)) {
    return plans;
  }

  const seen = new Set(plans.map((plan) => plan.slug));
  const entries: readonly unknown[] = configuredPlans;
  for (const entry of entries) {
    if (typeof entry !== 'string') {
      continue;
    }

    const slug = entry.trim().toLowerCase();
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) {
      continue;
    }

    seen.add(slug);
    plans.push({ name: slug, slug });
  }
  return plans;
}
