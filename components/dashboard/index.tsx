"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { useAuth } from "../../hooks/use-auth";
import Button from "../ui/button";
import Image from "next/image";

const DashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.welcomeTitle}>Welcome to the Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>
            <Image
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.avatarImage}
              width={100}
              height={100}
            />
          </div>

          <div className={styles.userInfo}>
            <h2 className={styles.userName}>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Personal Information</h3>
            <div className={styles.infoContent}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Gender:</span>
                <span className={styles.infoValue}>{user.gender}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Age:</span>
                <span className={styles.infoValue}>
                  {user.dob.age} years old
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone:</span>
                <span className={styles.infoValue}>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cell:</span>
                <span className={styles.infoValue}>{user.cell}</span>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Location</h3>
            <div className={styles.infoContent}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address:</span>
                <span className={styles.infoValue}>
                  {user.location.street.number} {user.location.street.name}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>City:</span>
                <span className={styles.infoValue}>{user.location.city}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>State:</span>
                <span className={styles.infoValue}>{user.location.state}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Country:</span>
                <span className={styles.infoValue}>
                  {user.location.country}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Postcode:</span>
                <span className={styles.infoValue}>
                  {user.location.postcode}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Account Details</h3>
            <div className={styles.infoContent}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Username:</span>
                <span className={styles.infoValue}>{user.login.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>UUID:</span>
                <span className={styles.infoValue}>{user.login.uuid}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Registered:</span>
                <span className={styles.infoValue}>
                  {new Date(user.registered.date).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nationality:</span>
                <span className={styles.infoValue}>{user.nat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
