import { useState, useEffect } from "react";
import { BASE_URL, ENDPOINTS } from "../utils/constants";
import _ from "lodash";

const Activity = () => {
  const { editActivity } = ENDPOINTS;
  const [activityList, setActivityList] = useState([]);

  function handleChange(e, id) {
    const { name, value } = e.target;
    setActivityList((prev) => {
      return prev.map((each_activity) => {
        if (each_activity.id === id) {
          each_activity[name] = value;
        }
        return each_activity;
      });
    });
  }
  async function handleUpdate() {
    let url = `${BASE_URL}${editActivity}`;
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityList),
    });
    const json = await data.json();
    setActivityList(json);
  }
  useEffect(() => {
    fetchActivityList();
  }, []);
  const fetchActivityList = async () => {
    let url = `${BASE_URL}`;
    const data = await fetch(url);
    const json = await data.json();
    setActivityList(json);
  };
  return activityList.length <= 0 ? (
    <p>Rendering</p>
  ) : (
    <div>
      <table>
        <tbody>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
          {activityList.map(({ id }, index) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <input
                  name="activity_name"
                  value={activityList[index].activity_name}
                  onChange={(e) => handleChange(e, id)}
                />
              </td>
              <td>
                <input
                  name="points"
                  value={activityList[index].points}
                  onChange={(e) => handleChange(e, id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button value="Submit" onClick={() => handleUpdate()}>
        Update
      </button>
    </div>
  );
};

export default Activity;
