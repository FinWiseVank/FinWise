import Form from "../../componentes/Form"

function Login() {
  return (
    <div className="flex w-full h-screen"> 
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Form />
      </div>
      <div className="hidden lg:flex h-full bg-gray-200">
        <div>
          holis
        </div>

      </div>

    </div>
  )
}

export default Login