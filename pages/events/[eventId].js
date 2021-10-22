import { Fragment } from 'react';

import { getEventById, getAllFeatured } from '../../helpers/util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export const getStaticProps = async ({ params }) => {
  const getEvent = params.eventId;
  const event = await getEventById(getEvent);
  return {
    props: {
      event,
    },
    revalidate: 20,
  };
};
export const getStaticPaths = async () => {
  const events = await getAllFeatured();
  const allEvents = events.map(event => ({
    params: { eventId: event.id },
  }));
  return {
    paths: allEvents,
    fallback: 'blocking',
  };
};
export default EventDetailPage;
