import { useForm } from 'react-hook-form'

function FormTarea({ currentTareaData, saveTarea, updateTarea }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (dataForm) => {

    if(currentTareaData) {
      dataForm["id"] = currentTareaData.id
      updateTarea(dataForm)
    } else {
      saveTarea(dataForm)
    }
  })

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/2'>
        <h1 className='text-slate-200 font-bold text-xl my-4'>Nueva Tarea</h1>
        <label htmlFor='nombre' className='text-white mt-2 block text-sm'>Nombre</label>
        <input type='text'
          {...(register("nombre", {
            required: {
              value: true,
              message: "El nombre es requerido"
            },
          }))}
          defaultValue={currentTareaData?.nombre}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.nombre && (
            <span className='text-red-500' >{errors.nombre.message.toString()}</span>
          )
        }
        <label htmlFor='descripcion' className='text-white mt-2 block text-sm'>Descripcion</label>
        <input type='text'
          {...(register("descripcion", {
            required: {
              value: true,
              message: "La descripcion es requerida"
            },
          }))}
          defaultValue={currentTareaData?.descripcion}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.descripcion && (
            <span className='text-red-500' >{errors.descripcion.message.toString()}</span>
          )
        }
        <label htmlFor='estado' className='text-white mt-2 block text-sm'>Estado</label>
        <select {...register("estado")}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          defaultValue={currentTareaData?.estado}
        >
          <option key={`estado_to_do`} value={`estado_to_do`}>To Do</option>
          <option key={`estado_in_progres`} value={`estado_in_progres`}>In Progress</option>
          <option key={`estado_done`} value={`estado_done`}>Done</option>
        </select>
        {
          errors.estado && (
            <span className='text-red-500' >{errors.estado.message.toString()}</span>
          )
        }
        <button type="submit" className='w-full bg-blue-500 text-white p-3 rounded-lg my-2'>
          {currentTareaData ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  )
}

export default FormTarea