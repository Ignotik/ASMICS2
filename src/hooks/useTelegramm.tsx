interface TelegramUser {
  id: number;
  username: string;
  first_name: string;
}

interface TelegramData {
  user: TelegramUser | null;
}

type TelegramHapticFeedback = {
  impactOccurred: (
    style: "light" | "medium" | "rigid" | "heavy" | "soft"
  ) => void;
  notificationOccurred: (type: "error" | "success" | "warning") => void;
};

interface StoryWidgetLink {
  url: string;
  name: string;
}
interface PopupButton {
  text: string;
  type: string;
  id: string;
}
export interface PopupParams {
  title: string;
  message: string;
  buttons: Array<PopupButton>;
}
interface TelegramWebApp {
  initDataUnsafe?: TelegramData;
  initData: string;
  close: () => void;
  platform?: string;
  expand: () => void;
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: TelegramHapticFeedback;
  disableVerticalSwipes: () => void;
  showPopup: (params: PopupParams, callback?: (id: string) => void) => void;
  shareToStory: (
    mediaUrl: string,
    params: {
      type: "image" | "video";
      text?: string;
      widget_link?: StoryWidgetLink;
    }
  ) => Promise<void>;
}

const tg: TelegramWebApp = (window as any).Telegram?.WebApp || {
  close: () => {},
  expand: () => {},
  HapticFeedback: {
    impactOccurred: () => {},
    notificationOccurred: () => {},
  },
  disableVerticalSwipes: () => {},
  showPopup: () => {},
  shareToStory: async () => {
    throw new Error("Telegram WebApp not available");
  },
};

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const shareToStory = async (
    mediaUrl: string,
    type: "image" | "video",
    caption: string,
    botUrl: string,
    botName: string
  ): Promise<void> => {
    if (tg.shareToStory) {
      const widgetLink: StoryWidgetLink = {
        url: botUrl,
        name: botName,
      };

      caption = `URL`;
      const text = caption;
      return tg.shareToStory(mediaUrl, { type, text, widget_link: widgetLink });
    } else {
      console.warn("Story sharing is not supported in this version.");
      throw new Error("Story sharing not supported");
    }
  };

  const userId = tg.initDataUnsafe?.user?.id || 3248324094992;
  const user = tg.initDataUnsafe?.user?.username || "ваываываываы";
  const name = tg.initDataUnsafe?.user?.first_name || null;
  const initData = tg.initDataUnsafe || "";

  return {
    onClose,
    shareToStory,
    tg,
    initData,
    userId,
    user,
    name,
  };
}
