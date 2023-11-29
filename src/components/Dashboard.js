import { useState, useEffect } from "react";
import { BASE_URL, ENDPOINTS } from "../utils/constants";
import EmployeeList from "./EmployeeList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [listOfEmployeeActivities, setlistOfEmployeeActivities] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    fetchEmployeesActivities();
  }, [startDate]);
  const { getEmployeeActivity } = ENDPOINTS;
  const fetchEmployeesActivities = async () => {
    let url = `${BASE_URL}${getEmployeeActivity}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        month_number: startDate?.getMonth() + 1,
        year_number: startDate?.getFullYear(),
      },
    });
    const json = await data.json();
    setlistOfEmployeeActivities(json);
  };
  return (
    <div>
      <div className="calendar-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      {listOfEmployeeActivities.length <= 0 && !startDate ? (
        <p>Rendering Tasks !!!!</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
            {listOfEmployeeActivities.map(
              ({ employee_name, id, total_points }) => (
                <EmployeeList
                  key={id}
                  employee_name={employee_name}
                  id={id}
                  total_points={total_points}
                />
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
