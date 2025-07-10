/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initDataUnsafe?: {
            user?: {
              id: number;
              username?: string;
              first_name?: string;
            };
          };
          initData: string;
          close: () => void;
          expand: () => void;
          BackButton?: {
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
            offClick: (callback: () => void) => void;
          };
          HapticFeedback: {
            impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
            notificationOccurred: (type: "error" | "success" | "warning") => void;
          };
          disableVerticalSwipes: () => void;
          showPopup: (params: any, callback?: (id: string) => void) => void;
          shareToStory: (mediaUrl: string, params: any) => Promise<void>;
        };
      };
    }
  }