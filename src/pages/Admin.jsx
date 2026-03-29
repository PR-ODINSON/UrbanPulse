import Card from "../components/common/Card";

const Admin = () => {
  return (
    <section className="view active">
      <div className="module-grid">
        <Card>
          <h3>Role-Based Access</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>Full control, integrations, user policy</td>
              </tr>
              <tr>
                <td>Operator</td>
                <td>Live monitoring, incident updates</td>
              </tr>
              <tr>
                <td>Analyst</td>
                <td>Read analytics, export reports</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card>
          <h3>Activity Logs</h3>
          <ul className="simple-list">
            <li>09:24 - Operator tagged incident IN-931 as resolved</li>
            <li>09:18 - Admin updated AQI alert threshold</li>
            <li>09:05 - Analyst exported congestion report</li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Admin;
