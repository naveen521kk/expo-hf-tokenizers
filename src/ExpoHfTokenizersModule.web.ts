import { registerWebModule, NativeModule } from 'expo';

import { ExpoHfTokenizersModuleEvents } from './ExpoHfTokenizers.types';

class ExpoHfTokenizersModule extends NativeModule<ExpoHfTokenizersModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoHfTokenizersModule);
