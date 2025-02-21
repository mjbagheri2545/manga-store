import { PropsWithChildren } from "react";

import ErrorModal from "@/components/ui/ErrorModal";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Button } from "@/components/utility";
import { AuthContext, TAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types";

import useGetUser from "../hooks/useGetUser";

type LoggedInUserProps = Omit<TAuthContext, "user" | "isLoggedIn"> & {
  userState: Omit<ReturnType<typeof useGetUser>, "setUser">;
  isLoggedIn: true;
} & PropsWithChildren;

function LoggedInUser({
  userState,
  children: App,
  ...restState
}: LoggedInUserProps) {
  if (userState.status === "idle" || userState.status === "pending") {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{ ...restState, user: userState.user as User }}
    >
      {userState.status === "error" && (
        <ErrorModal
          text="متاسفیم، در دریافت اطلاعات از سرور مشکلی پیش آمده. ممکن است مشکل
              از اتصال اینترنت شما باشد یا سرور در حال حاضر در دسترس نباشد."
        >
          <Button onClick={() => userState.execute()} className="btn-block">
            تلاش مجدد
          </Button>
        </ErrorModal>
      )}

      {App}
    </AuthContext.Provider>
  );
}

export default LoggedInUser;
