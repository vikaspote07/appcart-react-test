import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = Cookies.get("user"); 
    if (!userStr) {
      navigate("/login");
      return;
    }
    setUserData(JSON.parse(userStr)); 
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("user"); 
    navigate("/login");
  };

  if (!userData) return null;
console.log(userData)
  return (
    <div className="min-h-screen bg-light w-screen mt-10">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <User className="h-8 w-8 text-primary" />
              <span className="ml-2 h5">
                Welcome, {userData.firstName} {userData.lastName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger d-flex align-items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-6">

        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Personal Information</h5>
          </div>
          <div className="card-body">
            {userData ? (
              <>
                <p>
                  <strong>Name:</strong> {userData.firstName}{" "}
                  {userData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Contact No:</strong> {userData.contactNo}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address1}, {userData.city}
                  , {userData.state}, {userData.country}
                </p>
              </>
            ) : (
              <p>No personal information available.</p>
            )}
          </div>
        </div>

        
        {userData?.education?.length > 0 && (
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Education</h5>
            </div>
            <div className="card-body">
              {userData.education.map((user, index) => (
                <div key={index}>
                  <p>
                    <strong>Type:</strong> {user.type || "NA"}
                  </p>
                  <p>
                    <strong>Passing Year:</strong> {user.passingYear || "NA"}
                  </p>
                  <p>
                    <strong>School/College:</strong>{" "}
                    {user.schoolCollege || "NA"}
                  </p>
                  <p>
                    <strong>Percentage:</strong> {user.percentage || "NA"}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

    
        {(!userData?.education || userData.education.length === 0) && (
          <div className="card mt-4">
            <div className="card-body">
              <p>No education information available.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
