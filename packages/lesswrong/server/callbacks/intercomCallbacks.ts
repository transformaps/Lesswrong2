import { getIntercomClient } from '../intercomSetup';
import { getCollectionHooks } from '../mutationCallbacks';


getCollectionHooks("LWEvents").newAsync.add(function sendIntercomEvent (event: DbLWEvent, user: DbUser) {
  const intercomClient = getIntercomClient();
  if (intercomClient == null) {
    // If no intercomToken is configured, then intercomClient will be null,
    // and this is a dev install with Intercom disabled. Don't try to send
    // Intercom events in that case (it just causes spurious error messages.)
    return;
  }
  if (user && event && event.intercom) {
    // Append documentId to metadata passed to intercom
    event.properties = {
      ...event.properties,
      documentId: event.documentId,
    }
    // console.log(event);
    let currentTime = new Date();
    let intercomEvent = {
      event_name: event.name,
      created_at: Math.floor((currentTime.getTime()/1000)),
      user_id: user._id,
      metadata: event.properties
    };
    intercomClient.events.create(intercomEvent);
  }
});
