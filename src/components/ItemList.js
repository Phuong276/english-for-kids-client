import { ref, child, get, set } from "firebase/database";
import { db } from "../firebase";

export default function ItemList() {
  const dbRef = ref(db);
  get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  function writeUserData(id, idChild, text, status) {
    set(ref(db, "datas/arrays/" + id), {
      id: idChild,
      text: text,
      status: status,
    });
  }

  return (
    <div>
      <button onClick={() => writeUserData(1, 0, "phuong", true)}>Click</button>
    </div>
  );
}
