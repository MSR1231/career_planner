
import React from "react";
import CollegeList from "./CollegeList";
import InternshipList from "./InternshipList";
import ScholarshipList from "./ScholarshipList";
import MentorList from "./Mentors";
import Quiz from "./Quiz";
import TimelineTracker from "./TimelineTracker";
function Dashboard({ user }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      <CollegeList />
      <InternshipList />
      <ScholarshipList />
      <MentorList />
      <Quiz />
      <TimelineTracker />
    </div>
  );
}
export default Dashboard;