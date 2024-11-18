import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoHfTokenizersViewProps } from './ExpoHfTokenizers.types';

const NativeView: React.ComponentType<ExpoHfTokenizersViewProps> =
  requireNativeView('ExpoHfTokenizers');

export default function ExpoHfTokenizersView(props: ExpoHfTokenizersViewProps) {
  return <NativeView {...props} />;
}
