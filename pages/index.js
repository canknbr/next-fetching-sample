import { getAllFeatured } from '../helpers/util.js';
import EventList from '../components/events/event-list';

function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
export async function getStaticProps() {
  const allEvents = await getAllFeatured();
  return {
    props: { events: allEvents },
    revalidate: 600,
  };
}
export default HomePage;
