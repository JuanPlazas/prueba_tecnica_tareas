import NeedAdminComponent from "@/components/ui/needAdmin"

function PageAdmin({Seccion}) {
  return (
      Seccion && (
        <div>
            {
              Seccion?.user.id_rol == 1 ?
              <div className='flex justify-center items-center h-[calc(100vh-5rem)]'>
                <p className='text-5xl font-bold'>SOLO LO VE UN ADMIN</p>
              </div>
              :
              <NeedAdminComponent />
            }
        </div>
      )
    )
}

export default PageAdmin