import { useState } from "react";
import { EVENTS, JOIN_FORM } from "../data/innerCircleEvents";
import { innerCircleMeta } from "../data/pageMeta";
import { HEADSHOT_SRC } from "../components/Headshot";
import usePageMeta from "../hooks/usePageMeta";
import "./inner-circle.css";

const KIND = {
  meetup: "Meetup · In person",
  webinar: "Webinar · Online",
  roundtable: "Roundtable · Breakfast",
};
const CTA = {
  meetup: "Request a seat",
  webinar: "Register",
  roundtable: "Request an invite",
};
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "open", label: "Open sessions" },
  { id: "leaders", label: "Roundtables" },
  { id: "online", label: "Online" },
];

function dateParts(date) {
  if (!date) {
    return { day: "TBD", month: "", monthLong: "", weekday: "", weekdayLong: "" };
  }
  // Noon India time keeps the calendar date stable in any visitor's timezone.
  const d = new Date(`${date}T12:00:00+05:30`);
  return {
    day: String(d.getUTCDate()),
    month: MONTHS[d.getUTCMonth()],
    monthLong: MONTHS_LONG[d.getUTCMonth()],
    weekday: DAYS[d.getUTCDay()],
    weekdayLong: DAYS_LONG[d.getUTCDay()],
  };
}

function eventView(e) {
  const online = e.type === "webinar";
  const ist = online ? " IST" : "";
  return {
    ...dateParts(e.date),
    startTime: e.start + ist,
    kind: KIND[e.type],
    access: e.type === "roundtable" ? "Director+" : "Open",
    title: e.title,
    topic: e.topic,
    place: e.place,
    time:
      e.start + ist + (e.type === "roundtable" && e.seats ? ` · ${e.seats} seats` : ""),
    where: e.place + (e.venueNote ? `. ${e.venueNote}` : ""),
    when: `${e.start} to ${e.end}${ist}`,
    format: e.format,
    seats: e.seats ? String(e.seats) : "Open",
    cta: CTA[e.type],
    signupNote: e.signupNote,
    url: e.url || JOIN_FORM,
  };
}

function matchesFilter(type, filter) {
  if (filter === "open") return type !== "roundtable";
  if (filter === "leaders") return type === "roundtable";
  if (filter === "online") return type === "webinar";
  return true;
}

function upcomingEvents(now) {
  return EVENTS.filter((e) => !e.date || new Date(`${e.date}T23:59:59+05:30`) >= now).sort(
    (a, b) => {
      if (!a.date || !b.date) return (a.date ? 0 : 1) - (b.date ? 0 : 1);
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    },
  );
}

function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function SignupNote({ text, url }) {
  return (
    <p className="ic-signup-note">
      {text} <a href={url}>here</a>.
    </p>
  );
}

function EventCard({ event, hidden }) {
  const v = eventView(event);
  const leaders = event.type === "roundtable";
  return (
    <article className="ic-event" hidden={hidden}>
      <div className="ic-event__top">
        <div className="ic-event__date">
          <p className="ic-event__day">{v.day}</p>
          <div>
            <p className="ic-event__month">{v.month}</p>
            <p className="ic-event__weekday">{v.weekday}</p>
          </div>
        </div>
        <span className={leaders ? "ic-chip ic-chip--leaders" : "ic-chip"}>{v.access}</span>
      </div>
      <p className="ic-event__kind">{v.kind}</p>
      <h3>{v.title}</h3>
      <p className="ic-event__topic">{v.topic}</p>
      <div className="ic-event__foot">
        <div className="ic-event__meta">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span>{v.place}</span>
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <span>{v.time}</span>
          </span>
        </div>
        {v.signupNote ? (
          <SignupNote text={v.signupNote} url={v.url} />
        ) : (
          <a className="ic-link" href={v.url}>
            <span>{v.cta}</span>
            <ArrowIcon size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

function NextUp({ event }) {
  const v = eventView(event);
  return (
    <section className="ic-next" id="ic-next" aria-labelledby="ic-next-label">
      <div className="ic-wrap">
        <p className="ic-eyebrow" id="ic-next-label">Next up</p>
        <article className="ic-ticket">
          <div className="ic-ticket__date">
            <p className="ic-ticket__month">{v.monthLong}</p>
            <p className="ic-ticket__day">{v.day}</p>
            <p className="ic-ticket__when">{v.weekdayLong && <><span>{v.weekdayLong}</span><br /></>}<span>{v.startTime}</span></p>
          </div>
          <div className="ic-ticket__body">
            <span className="ic-chip">Open to all</span>
            <h3>{v.title}</h3>
            <p className="ic-ticket__topic">{v.topic}</p>
            <dl className="ic-details">
              <div><dt>Where</dt><dd>{v.where}</dd></div>
              <div><dt>When</dt><dd>{v.when}</dd></div>
              <div><dt>Format</dt><dd>{v.format}</dd></div>
              <div><dt>Seats</dt><dd>{v.seats}</dd></div>
            </dl>
            {v.signupNote ? (
              <SignupNote text={v.signupNote} url={v.url} />
            ) : (
              <a className="ic-btn ic-btn--primary" href={v.url}>
                <span>{v.cta}</span>
                <ArrowIcon />
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

function Calendar({ events }) {
  const [filter, setFilter] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const shown = events.filter((e) => matchesFilter(e.type, filter)).length;

  function selectFilter(id) {
    const count = events.filter((e) => matchesFilter(e.type, id)).length;
    setFilter(id);
    setAnnouncement(count === 1 ? "Showing 1 event" : `Showing ${count} events`);
  }

  return (
    <section className="ic-section ic-calendar" id="events" aria-labelledby="ic-events-title">
      <div className="ic-wrap">
        <div className="ic-calendar__head">
          <div className="ic-calendar__intro">
            <p className="ic-eyebrow">Calendar</p>
            <h2 className="ic-h2" id="ic-events-title">Upcoming events</h2>
            <p className="ic-lede">Open sessions are for anyone in the industry. Roundtables are for Director and above, or equivalent.</p>
          </div>
          <div className="ic-filters" role="group" aria-label="Filter events">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className="ic-filter"
                aria-pressed={filter === id}
                onClick={() => selectFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="ic-visually-hidden" aria-live="polite">{announcement}</p>

        <div className="ic-events">
          <p className="ic-empty" hidden={shown !== 0}>No events in this view yet. Join the circle and you'll hear when one is added.</p>
          {events.map((event) => (
            <EventCard
              key={`${event.date}-${event.title}`}
              event={event}
              hidden={!matchesFilter(event.type, filter)}
            />
          ))}
          <a className="ic-suggest" href={JOIN_FORM}>
            <span className="ic-suggest__title">Want a topic on the calendar?</span>
            <span className="ic-suggest__text">Suggest it in the join form. The most requested topics get the next slots.</span>
            <span className="ic-suggest__cta">
              Suggest a topic
              <ArrowIcon size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FounderAvatar() {
  const [photoFailed, setPhotoFailed] = useState(false);
  return (
    <div className="ic-avatar" aria-hidden="true">
      AK
      {!photoFailed && (
        <img src={HEADSHOT_SRC} alt="" onError={() => setPhotoFailed(true)} />
      )}
    </div>
  );
}

export default function InnerCircle() {
  usePageMeta(innerCircleMeta);
  const [events] = useState(() => upcomingEvents(new Date()));
  const nextOpenEvent = events.find((e) => e.type !== "roundtable");

  return (
    <div className="ic" id="top">
      {/* ===== Hero ===== */}
      <section className="ic-hero" aria-labelledby="ic-title">
        <div className="ic-wrap">
          <p className="ic-eyebrow">Bangalore and online · Free to join</p>
          <h1 id="ic-title">Supply Chain<br />Inner Circle</h1>
          <p className="ic-hero__lede">Specialized space for people who plan, build and run supply chains. Open to everyone in the industry, with a closed roundtable for senior leaders.</p>
          <div className="ic-actions">
            <a className="ic-btn ic-btn--primary" href={JOIN_FORM}>
              Join the Inner Circle
              <ArrowIcon />
            </a>
            <a className="ic-btn ic-btn--outline" href="#events">See upcoming events</a>
          </div>
        </div>
      </section>

      {/* ===== Two kinds of rooms ===== */}
      <section className="ic-section" aria-labelledby="ic-rooms-title">
        <div className="ic-wrap">
          <p className="ic-eyebrow">How it works</p>
          <h2 className="ic-h2" id="ic-rooms-title">Two kinds of rooms</h2>
          <p className="ic-lede">Everyone gets the open sessions. Senior leaders also get a smaller room, built for candid conversations between people who own the numbers.</p>

          <div className="ic-rooms">
            <article className="ic-room">
              <div className="ic-room__tag">
                <span className="ic-room__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.3c2.1.7 3.5 2.6 3.5 5.7" /></svg>
                </span>
                <span className="ic-room__label">Open to all</span>
              </div>
              <ul className="ic-formats" aria-label="Formats">
                <li>Meetups &amp; Webinars</li>
                <li>Group case study of a supply chain problem</li>
                <li>In-person meetups</li>
                <li>Speaker sessions</li>
              </ul>
              <p className="ic-room__desc">Meetups and webinars on the questions this community asks most, led by practitioners.</p>
              <dl className="ic-facts">
                <div><dt>Format</dt><dd>Meetups and webinars</dd></div>
                <div><dt>Seats</dt><dd>Up to 40 in person</dd></div>
                <div><dt>Speakers</dt><dd>Practitioners only</dd></div>
                <div><dt>Cost</dt><dd>Free, always</dd></div>
              </dl>
              <div className="ic-room__foot">
                <a className="ic-link" href="#events">
                  See upcoming events
                  <ArrowIcon size={16} />
                </a>
              </div>
            </article>

            <article className="ic-room ic-room--leaders">
              <h3 className="ic-room__title--center">Leaders' Roundtable</h3>
              <div className="ic-room__tag ic-room__tag--center">
                <span className="ic-room__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                </span>
                <span className="ic-room__label">Director and above, or equivalent · By invitation</span>
              </div>
              <p className="ic-room__desc">A closed room for senior leaders. One topic, no slides, and the Chatham House rule.</p>
              <ul className="ic-facts ic-facts--perks">
                <li>Access to other senior leaders</li>
                <li>Fractional talent available for industry usecases</li>
                <li>Panel discussions</li>
                <li>Organized debates</li>
              </ul>
              <div className="ic-room__foot">
                <a className="ic-link" href={JOIN_FORM}>
                  Request an invite
                  <ArrowIcon size={16} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Next up ===== */}
      {nextOpenEvent && <NextUp event={nextOpenEvent} />}

      {/* ===== Calendar ===== */}
      <Calendar events={events} />

      {/* ===== Founder's note ===== */}
      <section className="ic-section ic-founder" aria-labelledby="ic-founder-label">
        <div className="ic-wrap">
          <div className="ic-founder__aside">
            <p className="ic-eyebrow" id="ic-founder-label">Founder's note</p>
            <blockquote>Most groups like this turn into job boards or sales funnels. This one runs on small rooms and strict rules.</blockquote>
            <div className="ic-byline">
              <FounderAvatar />
              <div>
                <p className="ic-byline__name">Ayush Khaitan</p>
                <p className="ic-byline__role">Founder, Supply Chain Inner Circle</p>
              </div>
            </div>
          </div>
          <div className="ic-founder__letter">
            <p>I've spent 14 years in supply chain and operations, most recently as a Principal at Amazon running S&amp;OP and inventory planning across a 370+ node North America fulfillment network.</p>
            <p>When I offered to mentor three people, more than 500 reached out in a week. Supply chain people in India clearly want a place to learn from each other, and the good conversations are hard to find.</p>
            <p>Senior people quietly leave groups that get noisy. So the Inner Circle keeps rooms small, keeps sales pitches out, and treats everyone's time as the scarce resource it is.</p>
            <p>If that sounds like your kind of room, I'd love to have you.</p>
            <p className="ic-signature">Ayush</p>
            <p className="ic-founder__links"><a href="https://www.linkedin.com/in/ayushkhaitan/">LinkedIn</a><span aria-hidden="true"> · </span><a href="https://topmate.io/ayushkhaitan">Book a free 1:1</a></p>
          </div>
        </div>
      </section>

      {/* ===== House rules ===== */}
      <section className="ic-rules" aria-labelledby="ic-rules-title">
        <div className="ic-wrap">
          <div className="ic-card">
            <div className="ic-rules__head">
              <div>
                <p className="ic-eyebrow">House rules</p>
                <h2 className="ic-h2" id="ic-rules-title">What every member agrees to</h2>
              </div>
              <p>Five rules that keep the room worth showing up for.</p>
            </div>
            <ol className="ic-rule-list">
              <li>
                <span className="ic-check" aria-hidden="true"><CheckIcon /></span>
                <div><h3>No selling</h3><p>Vendors and consultants are welcome as practitioners. Sessions and the group stay pitch-free.</p></div>
              </li>
              <li>
                <span className="ic-check" aria-hidden="true"><CheckIcon /></span>
                <div><h3>No job asks in sessions</h3><p>Openings and asks go in one monthly thread, and nowhere else.</p></div>
              </li>
              <li>
                <span className="ic-check" aria-hidden="true"><CheckIcon /></span>
                <div><h3>Chatham House rule</h3><p>Share what you learned. Never who said it.</p></div>
              </li>
              <li>
                <span className="ic-check" aria-hidden="true"><CheckIcon /></span>
                <div><h3>Your details stay here</h3><p>The member list is never shared or sold.</p></div>
              </li>
              <li>
                <span className="ic-check" aria-hidden="true"><CheckIcon /></span>
                <div><h3>Show up when you RSVP</h3><p>Seats are limited. Two no-shows and you lose priority.</p></div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="ic-faq" aria-labelledby="ic-faq-title">
        <div className="ic-wrap">
          <p className="ic-eyebrow">FAQ</p>
          <h2 className="ic-h2" id="ic-faq-title">Questions</h2>
          <div className="ic-faq__list">
            <details open>
              <summary>Who can join?<PlusIcon /></summary>
              <p>Anyone who works in supply chain, operations, logistics or procurement, at any level. Leaders' Roundtables are for Director and above, or equivalent: you lead a supply chain function, team or P&amp;L, usually with 10+ years of experience.</p>
            </details>
            <details>
              <summary>Does it cost anything?<PlusIcon /></summary>
              <p>No. Joining and attending are free.</p>
            </details>
            <details>
              <summary>Where do events happen?<PlusIcon /></summary>
              <p>Bangalore first, with online webinars for everyone else. More cities as the circle grows.</p>
            </details>
            <details>
              <summary>How are roundtable seats decided?<PlusIcon /></summary>
              <p>From your form: role, seniority and company. Each table is curated so it has range across companies and functions.</p>
            </details>
            <details>
              <summary>I'm a vendor or recruiter. Can I join?<PlusIcon /></summary>
              <p>Yes, as a practitioner. Selling and recruiting stay out of sessions and the group.</p>
            </details>
            <details>
              <summary>How will I hear about events?<PlusIcon /></summary>
              <p>Join through the form and event invites come straight to your inbox.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ===== Origin ===== */}
      <section className="ic-origin" aria-label="How did this start?">
        <div className="ic-wrap">
          <details className="ic-origin__card">
            <summary>
              <span className="ic-origin__title">How did this start?</span>
              <span className="ic-origin__toggle">
                <span className="ic-origin__toggle-closed">Read the story</span>
                <span className="ic-origin__toggle-open">Close</span>
                <PlusIcon />
              </span>
            </summary>
            <p className="ic-origin__body">I wanted to give back to the community, so I offered to take on three mentees. More than 500 supply chain professionals reached out after that one LinkedIn post. The response showed me how many people are looking to connect with like-minded professionals in their field, so I decided to build this.</p>
          </details>
        </div>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="ic-cta" aria-labelledby="ic-cta-title">
        <div className="ic-wrap">
          <h2 id="ic-cta-title">Pull up a chair</h2>
          <p>Join the Supply Chain Inner Circle. Tell us where you work and what you're interested in. It takes about a minute, and it's free.</p>
          <div className="ic-actions">
            <a className="ic-btn ic-btn--light" href={JOIN_FORM}>
              Join the Inner Circle
              <ArrowIcon />
            </a>
            <a className="ic-btn ic-btn--ghost-light" href="https://topmate.io/ayushkhaitan">Book a free 1:1 on Topmate</a>
          </div>
        </div>
      </section>
    </div>
  );
}
