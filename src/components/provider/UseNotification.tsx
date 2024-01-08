import { useState } from "react";

export default function UseNotification() {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  const removeNotification = (message: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification !== message)
    );
  };

  return { notifications, addNotification, removeNotification };
}
