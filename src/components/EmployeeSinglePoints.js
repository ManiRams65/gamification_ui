import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, ENDPOINTS } from "../utils/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeSinglePoints = () => {
  const { id } = useParams();
  const { getActivityDetailById } = ENDPOINTS;
  const [employeeDetailsByPoint, setEmployeeDetailsByPoint] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetchEmployeeDetailsByPoint();
  }, [startDate]);
  const fetchEmployeeDetailsByPoint = async () => {
    let url = `${BASE_URL}${getActivityDetailById}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        id,
        month_number: startDate?.getMonth() + 1,
        year_number: startDate?.getFullYear(),
      },
    });
    const json = await data.json();
    setEmployeeDetailsByPoint(json);
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
      {employeeDetailsByPoint.length <= 0 && startDate ? (
        <p>Rendering</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>S. No</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
            {employeeDetailsByPoint.map(
              ({ created_date, activity_name, points }, index) => (
                <tr key={created_date}>
                  <td>{index + 1}</td>
                  <td>{activity_name}</td>
                  <td>{points}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeSinglePoints;
