import { getTareasQuery, createTareaQuery, deleteTareaQuery, updateTareaQuery } from "../../shared/queries/tareas/queries"
import { useEffect, useState } from "react";
import TablaTareas from "./components/TablaTareas"
import FormTarea from "./components/FormTarea";
import { useRouter } from "next/navigation"
import { useToast } from '@/components/ui/use-toast'
import Loading from "@/components/ui/loading";
import { peticionGraphql } from "@/shared/fetchShare";

function TareasPage({Seccion}) {
  const router = useRouter()
  const { toast } = useToast()
  const [tareasData, setTareasData] = useState([])
  const [currentTareaData, setCurrentTareaData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const tareasHeaders = [
    "Nombre",
    "Descripcion",
    "Estado",
    "Acciones"
  ]

  useEffect(() => {
    setIsLoading(true)
    if (Seccion) {
      peticion()
    }
    async function peticion() {
      const tareas = await peticionGraphql(getTareasQuery, Seccion.user.authorization)
      setTareasData(tareas?.data?.getTareas)
      setIsLoading(false)
    }
  }, [Seccion])

  const saveTarea = async (dataForm) => {
    try {
      const response = await peticionGraphql(createTareaQuery(dataForm), Seccion.user.authorization)
      if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if (response?.data?.createTarea?.id) {
        toast({
          title: "Exito",
          description: "Tarea creado con exito",
          className: "bg-green-600 text-white"
        })
        router.refresh()
      }

    } catch (error) {
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const updateTarea = async (dataForm) => {
    try {
      const response = await peticionGraphql(updateTareaQuery(dataForm), Seccion.user.authorization)
      if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if (response?.data?.updateTarea?.id) {
        toast({
          title: "Exito",
          description: "Tarea actualizada con exito",
          className: "bg-green-600 text-white"
        })
        router.refresh()
      }

    } catch (error) {
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const handleUpdateTarea = (tarea) => {
    setCurrentTareaData(tarea)
    setShowForm(true);
  }

  const handleDeleteTarea = async (idTarea) => {
    const response = await peticionGraphql(deleteTareaQuery(idTarea), Seccion.user.authorization)
    if (response.errors && response.errors.length > 0) {
      toast({
        title: "Error",
        description: response.errors[0].message,
        variant: "destructive"
      })
    }

    if (response?.data?.deleteTarea?.id) {
      toast({
        title: "Exito",
        description: "Tarea borrada con exito",
        className: "bg-green-600 text-white"
      })
      router.refresh()
    }
  }


  return (
    <div className="w-full flex flex-col h-[calc(100vh-7rem)]">
      {
        isLoading && (
          <Loading />
        )
      }
      <div className="my-10 flex flex-row justify-between items-center">
        <p className="font-bold text-xl border-b-2 border-slate-500 text-slate-500">
          Tareas
        </p>
        <button
          className='bg-slate-500 py-1 px-3 rounded-lg my-1 text-white hover:bg-slate-300'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : "Nuevo"}
        </button>
      </div>
      <div className="w-full flex flex-col h-[calc(100vh-7rem)] bg-gray-500 overflow-auto">
        {
          showForm ?
            <FormTarea
              currentTareaData={currentTareaData}
              saveTarea={saveTarea}
              updateTarea={updateTarea}
            />
            :
            <TablaTareas
              tareasData={tareasData}
              tareasHeaders={tareasHeaders}
              handleUpdate={handleUpdateTarea}
              handleDelete={handleDeleteTarea}
            />
        }
      </div>
    </div>
  )
}

export default TareasPage