import Mixpanel from "mixpanel";

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN ?? "dev");

export function trackSignup(user) {
  mixpanel.people.set(user.id, { $email: user.email, $name: user.name });
  mixpanel.track("Signed up", { distinct_id: user.id, source: "web" });
}

export function trackSearch(userId, resultCount) {
  mixpanel.track("Searched notes", { distinct_id: userId, results: resultCount });
}
