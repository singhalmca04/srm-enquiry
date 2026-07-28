import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SrmHeader from "./SrmHeader";
import SrmFooter from "./SrmFooter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, subDays } from "date-fns";
const apiUrl = "http://localhost:5000";
// const apiUrl = process.env.REACT_APP_API_URL;

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "V9#rT2!mQ7@xL4$kP8&z";
  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setAuthenticated(true);
      setShowModal(false);
      fetchStudents(1, null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (authenticated) {
      fetchStudents(page, fromDate, toDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
      setShowModal(false);
      setError("");
      fetchStudents(1, null, null);
    } else {
      setError("Not Valid Password");
    }
  };
  const setToday = () => {
    const today = new Date();
    setFromDate(today);
    setToDate(today);
    fetchStudents(1, today, today);
  };

  const setLast7Days = () => {
    const today = new Date();
    setFromDate(subDays(today, 6));
    setToDate(today);
    fetchStudents(1, subDays(today, 6), today);
  };

  const setThisMonth = () => {
    const today = new Date();
    setFromDate(startOfMonth(today));
    setToDate(today);
    fetchStudents(1, startOfMonth(today), today);
  };

  const clearFilters = () => {
    setFromDate(null);
    setToDate(null);
    setPage(1);

    fetchStudents(1, null, null);
  };
  const fetchStudents = async (pageNo = page, startDate = fromDate, endDate = toDate) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res =
        await axios.get(
          apiUrl +
          "/students",
          {
            params: {
              page: pageNo,
              fromDate: startDate ? startDate.toISOString().split("T")[0] : "",
              toDate: endDate ? endDate.toISOString().split("T")[0] : ""
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const downloadExcel = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${apiUrl}/students/download`,
      {
        params: {
          fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
          toDate: toDate ? toDate.toISOString().split("T")[0] : ""
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob"
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("token"); // if using JWT
    window.location.reload();
  };
  return (
    <>
      {showModal &&
        <div className="modal-overlay">
          <div className="modal-box">
            <h2> Admin Login </h2>
            <div className="password-container">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {
                  showPassword ? <FaEyeSlash /> : <FaEye />
                }
              </button>

            </div>
            {error && <div className="error">{error}</div>}
            <button onClick={handleLogin}> Login </button>
          </div>
        </div>
      }
      <SrmHeader />
      {
        authenticated &&
        <>
          <div className="admin">
            <div className="dashboard-header">

              <div>
                <h1>Admin Dashboard</h1>
                <p className="dashboard-subtitle">
                  Student Enquiry Management
                </p>
              </div>

              <div className="admin-actions">
                <div className="admin-profile">
                  <span className="admin-avatar"> A </span>
                  <span> Admin </span>
                </div>
                <button className="logout-btn" onClick={handleLogout}> Logout </button>
              </div>
            </div>
            <div className="filter-card">
              <div className="quick-filters">
                <button className="quick-btn" onClick={setToday}>Today</button>
                <button className="quick-btn" onClick={setLast7Days}>Last 7 Days</button>
                <button className="quick-btn" onClick={setThisMonth}>This Month</button>
                <button className="quick-btn reset" onClick={clearFilters}>Reset</button>
              </div>

              <div className="date-filter-row">
                <div className="filter-group">
                  <label>From Date</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) =>
                      setFromDate(date)
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Start Date"
                    className="date-picker"
                  />
                </div>

                <div className="filter-group">
                  <label>To Date</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) =>
                      setToDate(date)
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select End Date"
                    className="date-picker"
                 />
                </div>

                <button
                  className="filter-btn"
                  onClick={() => {
                    setPage(1);
                    fetchStudents();
                  }}
                >
                  Apply Filter
                </button>

                <button
                  className="download-btn"
                  onClick={downloadExcel}
                >
                  Download Excel
                </button>
              </div>
            </div>
            {
              loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <p>Loading students...</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Name </th>
                      <th> Phone Number </th>
                      <th> Email </th>
                      <th> Course </th>
                      <th> Referral Code </th>
                      <th>Message</th>
                      <th> Date </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      students.map((student, index) => (
                        <tr key={ student._id }>
                          <td> { index + 1 + (page - 1) * 10 } </td>
                          <td> { student.name } </td>
                          <td>{student.mobile}</td>
                          <td>{student.email}</td>
                          <td>{student.courseInfo.courseName}</td>
                          <td>{student.refcode}</td>
                          <td>{student.message}</td>
                          <td> { new Date(student.createdAt).toLocaleDateString()} </td>
                        </tr>
                      )
                      )
                    }
                  </tbody>
                </table>
              )
            }
            <br /><br />
            <div className="pagination">
              <button disabled={ page === 1 }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
              >
                Previous
              </button>

              <span>
                Page {page}
                of {totalPages}
              </span>

              <button
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next
              </button>
            </div>
          </div>
        </>
      }
      <SrmFooter />
    </>
  );
}

export default Admin;