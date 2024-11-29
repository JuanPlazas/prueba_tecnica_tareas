import Link from "next/link"
import { dataPages } from "@/shared/dataPages"

export default function Home({props, Seccion}) {
  return <section className="flex justify-center h-screen items-center px-10">
    <div className="grid grid-cols-3 mt-10 text-white gap-2">
      {
        dataPages.map((data, index) => (
          (Seccion?.user.id_rol == 1 ||
            Seccion?.user.id_rol == data.userRol.id) && (
            <Link
              key={`link_${index}`}
              href={data.url}
              className="bg-slate-600 hover:bg-slate-400 rounded-md p-10 flex justify-center items-center"
            >
              <p className="text-4xl font-bold">{data.description}</p>
            </Link>
          )))
      }
    </div>
  </section>
}
