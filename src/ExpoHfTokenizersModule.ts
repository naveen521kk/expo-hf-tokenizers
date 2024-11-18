import { NativeModule, requireNativeModule } from "expo";

import { EncodedText } from "./ExpoHfTokenizers.types";

declare class ExpoHfTokenizersModule extends NativeModule {
  encode(modelPath: string, text: string): Promise<EncodedText>;
  encodeWithExtra(
    modelPath: string,
    text: string,
    addSpecialTokens: boolean,
    withOverflowingTokens: boolean,
  ): Promise<EncodedText>;
  batchEncode(modelPath: string, texts: string[]): Promise<EncodedText[]>;
  batchEncodeWithExtra(
    modelPath: string,
    texts: string[],
    addSpecialTokens: boolean,
    withOverflowingTokens: boolean,
  ): Promise<EncodedText[]>;
  decode(modelPath: string, ids: bigint[]): Promise<string>;
  decodeWithExtra(
    modelPath: string,
    ids: bigint[],
    skipSpecialTokens: boolean,
  ): Promise<string>;
  batchDecode(modelPath: string, ids: bigint[][]): Promise<string[]>;
  batchDecodeWithExtra(
    modelPath: string,
    ids: bigint[][],
    skipSpecialTokens: boolean,
  ): Promise<string[]>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoHfTokenizersModule>("ExpoHfTokenizers");
