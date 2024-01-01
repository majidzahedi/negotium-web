import { toast } from 'sonner';
import { useSubscription } from 'urql';

const notification = `
  subscription Notifications {
    notifications{
      type
      message
    }
  }
`;

const handleSubscription = (_: any, response: any) => {
  const notification = response?.notifications;

  switch (notification?.type) {
    case 'INFO':
      toast.info(notification.message);
      break;

    case 'ERROR':
      toast.error(notification.message);
      break;

    default:
      break;
  }
};

export const notificationService = () => {
  useSubscription({ query: notification }, handleSubscription);
};
