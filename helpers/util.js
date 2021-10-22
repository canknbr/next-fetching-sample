export const getAllData = async () => {
  const response = await fetch(
    'https://next-fetching-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();
  const events = [];
  for (let key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
};
export const getAllFeatured = async () => {
  const allEvents = await getAllData();
  return allEvents.filter(event => event.isFeatured);
};

export const getEventById = async id => {
  const allEvents = await getAllData();

  return allEvents.find(event => event.id === id);
};
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllData();
  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
