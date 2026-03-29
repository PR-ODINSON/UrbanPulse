const Loader = ({ error = false, onRetry }) => {
  if (error) {
    return (
      <div className="overlay">
        <div className="overlay-card overlay-card-premium error">
          <div className="overlay-accent-line" />
          <p className="overlay-label">System Fault</p>
          <h2>Data Stream Unavailable</h2>
          <p className="overlay-copy">
            UrbanPulse could not sync real-time feeds. Verify integrations and
            reconnect the data bridge.
          </p>
          <div className="overlay-actions">
            <button className="btn btn-primary" onClick={onRetry}>
              Reconnect Stream
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="overlay-card overlay-card-premium">
        <div className="overlay-accent-line" />
        <p className="overlay-label">Initializing Command Center</p>
        <h2>Synchronizing City Systems</h2>
        <p className="overlay-copy">
          Building live telemetry context for traffic, environment, utilities, and
          emergency response.
        </p>
        <div className="overlay-progress">
          <div className="overlay-progress-bar" />
        </div>
        <div className="skeleton-grid">
          <div className="skeleton skeleton-lg" />
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
