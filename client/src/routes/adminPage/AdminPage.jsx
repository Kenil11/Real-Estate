import "./admin.scss";
import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import List from "../../components/list/List";

const AdminPage = () => {
  const data = useLoaderData();
  const [activeTab, setActiveTab] = useState("posts"); // "posts" or "users"


  return (
    <div className="admin-page">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.statsResponse} errorElement={<p>Error fetching Stats!</p>}>
          {(statsResponse) => {
            const userList = statsResponse.data.userList || [];
            return (
              <>
                <div className="stats-section">
                  <h2 className="section-title">Dashboard Overview</h2>
                  <div className="stats-cards">
                    <div
                      className={`stat-card users ${activeTab === "users" ? "active" : ""}`}
                      onClick={() => setActiveTab("users")}
                    >
                      <h3>Total Users</h3>
                      <p>{statsResponse.data.users}</p>
                    </div>
                    <div
                      className={`stat-card posts ${activeTab === "posts" ? "active" : ""}`}
                      onClick={() => setActiveTab("posts")}
                    >
                      <h3>Total Posts</h3>
                      <p>{statsResponse.data.posts}</p>
                    </div>
                  </div>
                </div>

                <div className="tab-content">
                  {activeTab === "users" && (
                    <div className="users-list">
                      <h2 className="section-title">All Users</h2>
                      {userList.length === 0 ? (
                        <p>No users found.</p>
                      ) : (
                        <ul>
                          {userList.map((user) => (
                            <li key={user.id}>
                              <img
                                src={user.avatar || "/noavatar.jpg"}
                                alt={user.username}
                              />
                              <span>{user.username}</span>
                              <span>{user.email}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === "posts" && (
                    <div className="posts-section">
                      <h2 className="section-title">All Posts</h2>
                      <Suspense fallback={<p>Loading posts...</p>}>
                        <Await
                          resolve={data.postResponse}
                          errorElement={<p>Error loading posts!</p>}
                        >
                          {(postResponse) => <List posts={postResponse.data.userPosts} />}
                        </Await>
                      </Suspense>
                    </div>
                  )}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default AdminPage;
