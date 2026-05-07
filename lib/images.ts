/*
  Centralised Unsplash placeholder URLs. Every <Image /> in the app reads
  from one of these constants. To swap an asset, change one line here.

  Each entry is annotated with where it appears and what we want the photo
  to convey. URLs use the `images.unsplash.com` CDN with deterministic
  query params so Next/Image caching is stable.
*/

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// PLACEHOLDER MAP — Landing page slots
export const IMG_HERO_LANDING = "/hero-image.png"; // Amaravati capital — golden-hour aerial render (local asset in /public)
export const IMG_FOUNDER_RESIDENCY = u("photo-1497366216548-37526070297c", 1400); // modern coworking
export const IMG_INCORPORATION = u("photo-1450101499163-c8848c66ca85", 1400); // paperwork / clean desk
export const IMG_EVENTS_COHORTS = u("photo-1540575467063-178a50c2df87", 1400); // pitch night / auditorium
export const IMG_AP_SKILLS_FUND = "/ap-skills-fund.png"; // founders collaborating around tablet (local asset in /public)
export const IMG_LOCAL_HIRING = "/local-hiring.png"; // engineer with laptop in data-center corridor (local asset in /public)
export const IMG_AI_GOVERNANCE = u("photo-1518770660439-4636190af475", 1400); // abstract data / circuit
export const IMG_GLOBAL_NETWORK = "/global-network.png"; // satellite view of Andhra Pradesh with Amaravati pinned (local asset in /public)
export const IMG_WHY_AP = u("photo-1599661046289-e31897846e41", 1600); // Indian river / capital landscape
export const IMG_FOUNDER_COHORT_GROUP = "/founder-cohort.png"; // founder pitching to cohort at all-hands (local asset in /public)

// PLACEHOLDER MAP — App page slots
export const IMG_LOGIN_SPLIT = u("photo-1517022812141-23620dba5c23", 1400); // dusk capital render
export const IMG_FOUNDER_PORTRAIT = "/founder-portrait.png"; // single founder portrait (local asset in /public)
export const IMG_DISTRICT_MAP = u("photo-1577086664693-894d8405334a", 1600); // aerial / isometric city render

// 8 community avatars — Unsplash portrait crops
export const IMG_AVATARS: string[] = [
  u("photo-1494790108377-be9c29b29330", 240),
  u("photo-1500648767791-00dcc994a43e", 240),
  u("photo-1573497019940-1c28c88b4f3e", 240),
  u("photo-1506794778202-cad84cf45f1d", 240),
  u("photo-1438761681033-6461ffad8d80", 240),
  u("photo-1544005313-94ddf0286df2", 240),
  u("photo-1492562080023-ab3db95bfbce", 240),
  u("photo-1607746882042-944635dfe10e", 240),
];

// District seal — small inline SVG mark, lives in <DistrictSeal /> component.
