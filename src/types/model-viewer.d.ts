declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': {
      src?: string;
      alt?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      'shadow-intensity'?: string;
      exposure?: string;
      'environment-image'?: string;
      style?: React.CSSProperties;
      onLoad?: () => void;
      onError?: () => void;
      children?: React.ReactNode;
    };
  }
}