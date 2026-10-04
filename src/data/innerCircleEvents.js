export const JOIN_FORM = "https://forms.gle/vLyd9eVqJ2sq4wcs6";

/*
  SAMPLE EVENTS: replace dates, topics and venues with real ones before publishing.
  - date: YYYY-MM-DD (India time). An event disappears the day after it happens.
    Use null for a date that isn't set yet; the card shows "TBD" and stays listed after dated events.
  - type: 'meetup' | 'webinar' | 'roundtable'
  - url: optional registration link. Defaults to the join form.
  - signupNote: optional sentence shown instead of the sign-up button, followed by a linked "here".
*/
export const EVENTS = [
  {
    date: "2026-10-17",
    start: "10:00 AM",
    end: "12:30 PM",
    type: "meetup",
    title: "Bangalore Meetup #1",
    topic: "Dark store inventory: what actually breaks at 10-minute delivery",
    place: "Indiranagar, Bangalore",
    venueNote: "Venue shared on RSVP.",
    format: "Three short talks, then open discussion",
    seats: 10,
    signupNote: "To receive information on this event, please fill up the form",
  },
  {
    date: null,
    start: "7:00 PM",
    end: "8:00 PM",
    type: "webinar",
    title: "Breaking into supply chain planning",
    topic: "What hiring managers look for, and how to build the skills",
    place: "Online",
    venueNote: "Link sent when you register.",
    format: "Talk and live Q&A",
    seats: null,
  },
  {
    date: null,
    start: "9:00 AM",
    end: "11:00 AM",
    type: "roundtable",
    title: "Leaders' Roundtable #1",
    topic: "AI in planning: what is actually in production today",
    place: "Bangalore",
    venueNote: "Venue shared with confirmed guests.",
    format: "Breakfast, one topic, no slides",
    seats: 12,
  },
  {
    date: null,
    start: "10:00 AM",
    end: "12:30 PM",
    type: "meetup",
    title: "Bangalore Meetup #2",
    topic: "Peak season playbook: capacity, inventory and labor",
    place: "Bangalore",
    venueNote: "Venue shared on RSVP.",
    format: "Three short talks, then open discussion",
    seats: 40,
  },
  {
    date: null,
    start: "9:00 AM",
    end: "11:00 AM",
    type: "roundtable",
    title: "Leaders' Roundtable #2",
    topic: "Network design for quick commerce",
    place: "Bangalore",
    venueNote: "Venue shared with confirmed guests.",
    format: "Breakfast, one topic, no slides",
    seats: 12,
  },
];
