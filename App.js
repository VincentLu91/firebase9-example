import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "./firebase";

export default function App() {
  const [recordings, setRecordings] = useState([]);

  const getData = async () => {
    const recordingRef = collection(
      db,
      `recordings/CvKhT7Q8Ubeo4ImF3qToeJZBEJ22/files`
    );

    const querySnapshot = await getDocs(recordingRef);
    console.log("querySnapshot: ", querySnapshot);
    // const recordingRefQuery = query(
    //   recordingRef,
    //   where("user", "==", "CvKhT7Q8Ubeo4ImF3qToeJZBEJ22")
    // );

    // const querySnapshot = await getDocs(recordingRefQuery); // todo - wrap in try catch

    if (querySnapshot) {
      // todo - don't need this as querySnapshot will not be undefined or null
      const data = [];
      querySnapshot.forEach((documentSnapshot) => {
        // remove the async keyword as there is no asynchronous code in forEach
        if (documentSnapshot.exists) {
          // doc ss would always exist since it is a result of query and not something you created. It would return existing snapshots only, so no need to isExists check
          data.push(documentSnapshot.data());
        }
      });

      // querySnapshot.forEach(doc => data.push(doc.data())) - this should be enough

      setRecordings(
        data.map((el, i) => {
          return { ...el, filepath: i };
        })
      );
    }
  };

  useEffect(() => {
    getData();
  }, [recordings.length]);

  console.log(recordings);

  return (
    <View style={styles.container}>
      <Text>TEST</Text>
      {recordings.map((r) => (
        <View style={styles.listItem} key={r.filepath}>
          <Text>filename: {r.fileName}</Text>
          {/* <Text>{r.originalFilename}</Text> */}
          {/* <Text>{r.transcript}</Text> */}
          <Text>filepath: {r.filepath}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
