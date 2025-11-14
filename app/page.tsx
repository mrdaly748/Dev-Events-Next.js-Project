import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/Explorebtn";
import { IEvent } from "@/database";

const page = async () => {
  'use cache';

  // Fetch real events at runtime
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const { events }: { events: IEvent[] } = await response.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can Not Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
