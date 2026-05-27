interface Window {
  Kakao: {
    isInitialized: () => boolean;
    init: (key: string) => void;
    Share: {
      sendDefault: (settings: KakaoShareSettings) => void;
    };
  };
}

interface KakaoShareSettings {
  objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
  content: {
    title: string;
    description?: string;
    imageUrl?: string;
    link: {
      mobileWebUrl?: string;
      webUrl?: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl?: string;
      webUrl?: string;
    };
  }[];
}
