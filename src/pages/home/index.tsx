import { Social } from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { db } from "../../services/FirebaseConnection";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface linkProps {
  id: string;
  name: string;
  url: string;
  color: string;
  bg: string;
  created: Date;
}

interface socialLinkProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<linkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<socialLinkProps>();

  useEffect(() => {
    async function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSocialLinks({
          facebook: docSnap.data().facebook,
          instagram: docSnap.data().instagram,
          youtube: docSnap.data().youtube,
        });
      } else {
        console.log("No such document!");
      }
    }
    loadSocialLinks();
  }, []);

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const q = query(linksRef, orderBy("created", "asc"));
      getDocs(q).then((snapshot) => {
        let list = [] as linkProps[];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            color: doc.data().color,
            bg: doc.data().bg,
            created: doc.data().created,
          });
        });
        setLinks(list);
      });
    }
    loadLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        David Santos
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.length > 0 &&
          links.map((item) => (
            <section
              style={{ backgroundColor: item.bg, color: item.color }}
              key={item.id}
              className="mb-4 w-full py-2 rounded-lg select-none cursor-pointer transition-transform hover:scale-105 "
            >
              <a href={item.url} target="_blank" rel="noreferrer">
                <p className="text-base md:text-lg">{item.name}</p>
              </a>
            </section>
          ))}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.facebook || ""}>
              <FaFacebook size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.youtube || ""}>
              <FaYoutube size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.instagram || ""}>
              <FaInstagram size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
