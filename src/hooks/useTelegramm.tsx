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
  const initData =
    tg.initData ||
    "query_id=AAFC7Wk0AgAAAELtaTSnZwxt&user=%7B%22id%22%3A5174324546%2C%22first_name%22%3A%22Ignat%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Zhdanign%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FctHJxe2GUvhWe84V3ds66zcX2ok9tk5NxMk3ck4IvCZn-xQcR6EjpjR8ticMUkUz.svg%22%7D&auth_date=1752167287&signature=aAc3llT4fllY2c07sNbsAk-BX5b0dua0oezmqNSQauZvoLDVnQkIIPi9A95-oE1rn9d4wHwk8ziOf_XVl0UGBQ&hash=bf9dc6dc8b19c96627ae9af22afcbe15633673c58b193cd41a85431e79869f7b";

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
