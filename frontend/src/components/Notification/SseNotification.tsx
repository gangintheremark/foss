interface Notification {
  content: string;
  targetUrl: string;
  isRead: boolean;
  createdDate: string;
}

interface SetupEventSourceOptions {
  onMessage: (notification: Notification) => void;
  token: string;
  url?: string;
}

const setupEventSource = ({
  onMessage,
  token,
  url = 'http://localhost:8080/sse/subscribe',
}: SetupEventSourceOptions) => {
  const fetchStream = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to connect');
      }
      console.log(response.body);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          console.log(buffer);

          let boundary;
          while ((boundary = buffer.indexOf('\n\n')) >= 0) {
            const eventData = buffer.slice(0, boundary).trim();
            buffer = buffer.slice(boundary + 2);

            if (eventData) {
              const lines = eventData.split('\n');
              lines.forEach((line) => {
                if (line.startsWith('data:')) {
                  const jsonData = line.substring(5).trim();
                  console.log(jsonData);
                  try {
                    const newNotification: Notification = JSON.parse(jsonData);
                    onMessage(newNotification);
                  } catch (error) {
                    console.error('Failed to parse notification:', error);
                  }
                }
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  fetchStream();
};

export default setupEventSource;
