import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../services/FirebaseConnection";
import { addDoc, setDoc, getDoc, doc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    async function loadLinks() {
      const docRef = doc(db, "social", "link");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFacebook(docSnap.data().facebook);
        setInstagram(docSnap.data().instagram);
        setYoutube(docSnap.data().youtube);
      } else {
        console.log("No such document!");
      }
    }
    loadLinks();
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (facebook === "" || instagram === "" || youtube === "") {
      alert("Preencha todos os campos!");
      return;
    }
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        alert("Links salvos com sucesso!");
        
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Erro ao salvar os links, tente novamente mais tarde.");
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>
      <form
        action=""
        className="flex flex-col max-w-xl w-full"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          placeholder="Digite a URL do Facebook"
          type="url"
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do Instragram
        </label>
        <Input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="Digite a URL do Instagram"
          type="url"
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do Youtube
        </label>
        <Input
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          placeholder="Digite a URL do Youtube"
          type="url"
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium "
        >
          Salvar Links
        </button>
      </form>
    </div>
  );
}
