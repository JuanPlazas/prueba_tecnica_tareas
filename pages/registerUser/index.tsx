import { useForm } from 'react-hook-form'
import { createUserQuery } from "../../shared/queries/user/queries"
import { peticionGraphql } from '@/shared/fetchShare'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function RegisterUSer({Seccion}) {
  const router = useRouter()
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (dataForm) => {
    try {
      const response = await peticionGraphql(createUserQuery(dataForm), "registerUser")
      if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if (response?.data?.createUser?.id) {
        toast({
          title: "Exito",
          description: "usuario creado con exito",
          className: "bg-green-600 text-white"
        })
        router.push("/")
      }

    } catch (error) {
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  })

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={onSubmit}>
        <h1 className='font-bold text-xl my-4'>Nuevo Usuario</h1>
        <label htmlFor='email' className='mt-2 block text-sm'>Email</label>
        <input type='email'
          {...(register("email", {
            required: {
              value: true,
              message: "El email es requerido"
            },
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.email && (
            <span className='text-red-500' >{errors.email.message.toString()}</span>
          )
        }
        <label htmlFor='nombre' className='mt-2 block text-sm'>Nombre</label>
        <input type='text'
          {...(register("nombre", {
            required: {
              value: true,
              message: "El nombre es requerido"
            },
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.nombre && (
            <span className='text-red-500' >{errors.nombre.message.toString()}</span>
          )
        }
        <label htmlFor='password' className='mt-2 block text-sm'>Password</label>
        <input type='text'
          {...(register("password", {
            required: {
              value: true,
              message: "El password es requerido"
            },
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.password && (
            <span className='text-red-500' >{errors.password.message.toString()}</span>
          )
        }
        <label htmlFor='provider' className='mt-2 block text-sm'>Provider</label>
        <input type='text'
          {...(register("provider", {
            required: {
              value: true,
              message: "El provider es requerido"
            },
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.provider && (
            <span className='text-red-500' >{errors.provider.message.toString()}</span>
          )
        }
        <label htmlFor='id_rol' className='mt-2 block text-sm'>Rol</label>
        <select {...register("id_rol")}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          defaultValue={3}
          disabled
        >
          <option key={`admin`} value={1}>Administrador</option>
          <option key={`user`} value={3}>Usuario</option>
        </select>
        {
          errors.id_rol && (
            <span className='text-red-500' >{errors.id_rol.message.toString()}</span>
          )
        }
        <div className='flex flex-row items-center justify-between '>
          <button type="submit" className='w-full bg-blue-500 text-white p-3 rounded-lg my-2'>
            Crear
          </button>
          <div
            className="text-center cursor-pointer w-full bg-gray-600 text-white p-3 rounded-lg my-2 "
            onClick={() => router.push("/")}
          >
            Cancelar
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterUSer