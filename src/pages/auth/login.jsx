import { Header } from "../../components/header";

export const Login = () => {
  return (
    <>
      <div className="px-30">
        <Header />
        <div className="p-5">
          <h1 className="text-4xl mb-15">Login</h1>
          <div>
            <form className="flex flex-col w-[50%] gap-6">
              <div className="flex flex-col ">
                <span>Email:</span>
                <input
                  type="email"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Elektron pochtangizni kiriting:"
                />
              </div>
              <div className="flex flex-col">
                <span>Password:</span>
                <input
                  type="password"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Parolingizni kiriting:"
                />
              </div>
              <input
                type="submit"
                className="bg-green-900 text-white h-[50px] rounded"
                value="Kirish"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
