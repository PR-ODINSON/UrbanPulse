const Loader = ({ error = false, onRetry }) => {
  if (error) {
    return (
      <div className="overlay">
        <div className="overlay-card error">
          <h2>Data Stream Unavailable</h2>
          <p>
            UrbanPulse could not sync real-time feeds. Check integration status and
            retry.
          </p>
          <button className="btn btn-primary" onClick={onRetry}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="overlay-card">
        <h2>Loading UrbanPulse...</h2>
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
