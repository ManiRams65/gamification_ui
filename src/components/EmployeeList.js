const { useNavigate } = require("react-router-dom");

const EmployeeList = ({ employee_name, id, total_points }) => {
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/employee-point/${id}`);
  }
  return (
    <tr onClick={() => handleClick(id)}>
      <td>{employee_name}</td>
      <td>{total_points}</td>
    </tr>
  );
};

export default EmployeeList;
