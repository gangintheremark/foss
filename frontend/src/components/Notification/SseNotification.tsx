interface Notification {
  content: string;
  targetUrl: string;
  isRead: boolean;
  createdDate: string;
}

const setupEventSource = (onMessage: (notification: Notification) => void) => {
  const eventSource = new EventSource('/sse/subscribe');

  eventSource.onmessage = (event: MessageEvent) => {
    try {
      const newNotification: Notification = JSON.parse(event.data);
      onMessage(newNotification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
    }
  };

  return () => {
    eventSource.close();
  };
};

export default setupEventSource;
