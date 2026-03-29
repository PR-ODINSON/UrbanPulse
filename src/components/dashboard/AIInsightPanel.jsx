const AIInsightPanel = ({ insightText }) => {
  return (
    <aside className="ai-insight-panel">
      <div className="insight-dot" />
      <div>
        <p className="insight-label">AI Insight</p>
        <p id="ai-insight-text">{insightText}</p>
      </div>
    </aside>
  );
};

export default AIInsightPanel;
