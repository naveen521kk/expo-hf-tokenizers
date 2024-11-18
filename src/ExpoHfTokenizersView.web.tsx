import * as React from 'react';

import { ExpoHfTokenizersViewProps } from './ExpoHfTokenizers.types';

export default function ExpoHfTokenizersView(props: ExpoHfTokenizersViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
