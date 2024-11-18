package expo.modules.hftokenizers

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

import ai.djl.huggingface.tokenizers.Encoding
import ai.djl.huggingface.tokenizers.HuggingFaceTokenizer
import android.os.Build
import androidx.annotation.RequiresApi
import expo.modules.kotlin.exception.CodedException

import java.net.URI
import java.nio.file.Path
import java.nio.file.Paths

class ExpoHfTokenizersModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoHfTokenizers")


    fun getTokenizer(modelPath: String): HuggingFaceTokenizer {
      return try {
        val tokenizerModel: Path
        if (modelPath.startsWith("file")) {
          tokenizerModel = Paths.get(URI(modelPath))
        } else {
          tokenizerModel = Paths.get(modelPath);
        }

        HuggingFaceTokenizer.newInstance(tokenizerModel)
      } catch (e: Exception) {
        throw RuntimeException(e)
      }
    }

    fun formatOutput(encoding: Encoding): Map<String, Any> {
      return mapOf(
        "ids" to encoding.ids.toList(),
        "attentionMask" to encoding.attentionMask.toList(),
        "tokens" to encoding.tokens.toList()
      )
    }

    AsyncFunction("encode") { modelPath: String, text: String, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          promise.resolve(formatOutput(tokenizer.encode(text)))
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message));
      }
    }

    AsyncFunction("encodeWithExtra") { modelPath: String, text: String, addSpecialTokens: Boolean, withOverflowingTokens: Boolean, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          promise.resolve(formatOutput(tokenizer.encode(text, addSpecialTokens, withOverflowingTokens)))
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("batchEncode") { modelPath: String, texts: List<String>, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          val output = texts.map { formatOutput(tokenizer.encode(it)) }
          promise.resolve(output)
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("batchEncodeWithExtra") { modelPath: String, texts: List<String>, addSpecialTokens: Boolean, withOverflowingTokens: Boolean, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          val output = texts.map { formatOutput(tokenizer.encode(it, addSpecialTokens, withOverflowingTokens)) }
          promise.resolve(output)
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("decode") { modelPath: String, ids: List<Long>, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          promise.resolve(tokenizer.decode(ids.toLongArray()))
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("decodeWithExtra") { modelPath: String, ids: List<Long>, skipSpecialTokens: Boolean, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          promise.resolve(tokenizer.decode(ids.toLongArray(), skipSpecialTokens))
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("batchDecode") { modelPath: String, batchIds: List<List<Long>>, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          val output = batchIds.map { tokenizer.decode(it.toLongArray()) }
          promise.resolve(output)
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }

    AsyncFunction("batchDecodeWithExtra") { modelPath: String, batchIds: List<List<Long>>, skipSpecialTokens: Boolean, promise: Promise ->
      try {
        getTokenizer(modelPath).use { tokenizer ->
          val output = batchIds.map { tokenizer.decode(it.toLongArray(), skipSpecialTokens) }
          promise.resolve(output)
        }
      } catch (e: Exception) {
        promise.reject(CodedException(e.message))
      }
    }
  }
}
