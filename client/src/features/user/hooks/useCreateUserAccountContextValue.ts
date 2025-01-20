import useAccountVerification from "./useAccountVerification";
import useUpdatePassword from "./useUpdatePassword";

function useCreateUserAccountContextValue() {
  const accountVerification = useAccountVerification();
  const updatePassword = useUpdatePassword();

  return {
    verification: accountVerification,
    password: updatePassword,
  };
}

export default useCreateUserAccountContextValue;
