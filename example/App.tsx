import { useEvent } from "expo";
import ExpoHfTokenizers from "expo-hf-tokenizers";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";

const downloadUrls = [
  "https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/tokenizer.json",
  "https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/config.json",
  "https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/special_tokens_map.json",
  "https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/tokenizer_config.json",
  "https://github.com/chroma-core/onnx-embedding/raw/refs/heads/main/onnx/vocab.txt",
];

export default function App() {
  const onChangePayload = useEvent(ExpoHfTokenizers, "onChange");
  const [encoded, setEncoded] = React.useState("");
  const [decoded, setDecoded] = React.useState("");

  React.useEffect(() => {
    const a = async () => {
      console.log("oh well");

      console.log("Downloading resources");
      const tokenizerFilePath = FileSystem.cacheDirectory + "/tokenizer";

      const exists = await FileSystem.getInfoAsync(tokenizerFilePath);
      if (!exists.exists) {
        await FileSystem.makeDirectoryAsync(tokenizerFilePath, {
          intermediates: true,
        });
      }

      // Download files
      const downloadPromises = [];

      for (const url of downloadUrls) {
        const toFile = tokenizerFilePath + "/" + url.split("/").pop();

        // Check if file exists
        const fileExists = await FileSystem.getInfoAsync(toFile);
        if (fileExists.exists) {
          console.log("File already exists, skipping download: " + toFile);
          continue;
        }
        console.log(`Downloading ${url} to ${toFile}`);
        downloadPromises.push(
          FileSystem.downloadAsync(url, toFile).then((res) => {
            console.log("Downloaded " + toFile);
          })
        );
      }

      await Promise.all(downloadPromises);

      // list the files
      const files = await FileSystem.readDirectoryAsync(tokenizerFilePath);
      console.log(files);

      try {
        const b = await ExpoHfTokenizers.encode(
          tokenizerFilePath,
          "Hello World, my name is Naveen M K."
        );
        console.log(b);
        setEncoded(JSON.stringify(b, null, 4));

        const c = await ExpoHfTokenizers.decode(tokenizerFilePath, b.ids);
        console.log(c);
        setDecoded(c);
      } catch (e) {
        console.error(e);
      }
    };
    a();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Functions">
          <Text>{encoded}</Text>
          <Text>{decoded}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
