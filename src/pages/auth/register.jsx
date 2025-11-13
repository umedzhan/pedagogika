import { Header } from "../../components/header";

export const Register = () => {
  return (
    <>
      <div className="px-30">
        <Header />
        <div className="p-5">
          <h1 className="text-4xl mb-15">Register</h1>
          <div>
            <form className="flex flex-col w-[50%] gap-6">
              <div className="flex flex-col">
                <span>Email:</span>
                <input
                  type="email"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Elektron pochtangizni kiriting:"
                />
              </div>
              <div className="flex flex-col">
                <span>Name:</span>
                <input
                  type="text"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="To'liq ismingizni kiriting:"
                />
              </div>
              <div className="flex flex-col">
                <span>Birth of date:</span>
                <input
                  type="date"
                  className="h-[50px] border border-[#878787] rounded px-3"
                />
              </div>
              <div className="flex flex-col">
                <span>Jins:</span>
                <div className="flex gap-10">
                  <div className="flex gap-2">
                    <input type="radio" name="jins" />
                    Erkak
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="jins" />
                    Ayol
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span>Password:</span>
                <input
                  type="password"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Parolingizni kiriting:"
                />
              </div>
              <div className="flex flex-col">
                <span>Verify password:</span>
                <input
                  type="password"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Parolingizni tasdiqlang:"
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

export default Register;
