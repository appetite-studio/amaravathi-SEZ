import founderJson from "@/data/founder.json";
import companiesJson from "@/data/companies.json";
import notificationsJson from "@/data/notifications.json";
import forumJson from "@/data/forum.json";
import eventsJson from "@/data/events.json";
import cohortsJson from "@/data/cohorts.json";
import metricsJson from "@/data/metrics.json";
import toolsJson from "@/data/tools.json";

export type Founder = typeof founderJson;
export type Company = (typeof companiesJson)[number];
export type Notification = (typeof notificationsJson)[number];
export type ForumChannel = (typeof forumJson)["channels"][number];
export type ForumPost = (typeof forumJson)["posts"][number];
export type EventItem = (typeof eventsJson)[number];
export type Cohorts = typeof cohortsJson;
export type Metrics = typeof metricsJson;
export type Tool = (typeof toolsJson)[number];

export const founder: Founder = founderJson;
export const companies: Company[] = companiesJson;
export const notifications: Notification[] = notificationsJson;
export const forum = forumJson;
export const events: EventItem[] = eventsJson;
export const cohorts: Cohorts = cohortsJson;
export const metrics: Metrics = metricsJson;
export const tools: Tool[] = toolsJson;
