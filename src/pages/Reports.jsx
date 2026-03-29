import Card from "../components/common/Card";

const Reports = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>Complaint Queue</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CR-301</td>
                <td>Road</td>
                <td>In Progress</td>
                <td>High</td>
              </tr>
              <tr>
                <td>CR-302</td>
                <td>Water</td>
                <td>Open</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>CR-303</td>
                <td>Safety</td>
                <td>Escalated</td>
                <td>Critical</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card>
          <h3>Category Mix</h3>
          <div className="mock-chart bar-chart" />
        </Card>
        <Card>
          <h3>Map-Linked Reports</h3>
          <div className="mock-chart heatmap" />
        </Card>
      </div>
    </section>
  );
};

export default Reports;
