import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/FirebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
interface linkProps {
  id: string;
  name: string;
  url: string;
  color: string;
  bg: string;
  created: Date;
}

export function Admin() {
  const [nameInput, setNameInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [colorInput, setColorInput] = useState<string>("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] =
    useState<string>("#121212");
  const [links, setLinks] = useState<linkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const q = query(linksRef, orderBy("created", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const links = [] as linkProps[];
      querySnapshot.forEach((doc) => {
        links.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          color: doc.data().color,
          bg: doc.data().bg,
          created: doc.data().created,
        });
      });
      setLinks(links);
    });
    return () => unsubscribe();
  }, []);

  function handleDeleteLink(id: string) {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja deletar esse link?"
    );
    if (!confirmDelete) {
      return;
    }
    const docRef = doc(db, "links", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("Link deletado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao deletar link: ", error);
      });
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      color: colorInput,
      bg: backgroundColorInput,
      created: new Date(),
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setNameInput("");
        setUrlInput("");
        setColorInput("#f1f1f1");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar: ", error);
      });

    const data = {
      name: nameInput,
      url: urlInput,
      color: colorInput,
      backgroundColor: backgroundColorInput,
    };

    console.log(data);
    setNameInput("");
    setUrlInput("");
    setColorInput("#f1f1f1");
    setBackgroundColorInput("#121212");
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mt-8 mb-3 w-full max-width-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">
          Nome do label
        </label>
        <Input
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          placeholder="Digite o nome do link"
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
          }}
          placeholder="Digite a url do link"
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2  items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Color do Link
            </label>
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2  items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando o seu link
            </label>
            <article
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 scroll-py-3.5"
            >
              <p style={{ color: colorInput }} className="font-medium">
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>
      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
      {links.length === 0 && (
        <span className="text-white font-medium">
          Você ainda não tem links cadastrados!
        </span>
      )}
      {links.length !== 0 &&
        links.map((link) => (
          <article
            className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2"
            style={{ backgroundColor: link.bg, color: link.color }}
            key={link.id}
          >
            <p>{link.name} </p>
            <div>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="border border-dashed  p-1 rounded text-white font-bold bg-neutral-900"
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </div>
          </article>
        ))}
    </div>
  );
}
