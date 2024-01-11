"use client";
import { useEffect } from "react";
import UseNotification from "./UseNotification";

export default function MyNotification() {
  const { notifications, addNotification, removeNotification } =
    UseNotification();

  useEffect(() => {
    const interval = setInterval(() => {
      addNotification("Hello from the next notification!");
    }, 3000);

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index}>
          {notification}
          <button onClick={() => removeNotification(notification)}>
            Close
          </button>
        </div>
      ))}
    </div>
  );
}
