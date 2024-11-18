import { NativeModule, requireNativeModule } from 'expo';

import { ExpoHfTokenizersModuleEvents } from './ExpoHfTokenizers.types';

declare class ExpoHfTokenizersModule extends NativeModule<ExpoHfTokenizersModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoHfTokenizersModule>('ExpoHfTokenizers');
