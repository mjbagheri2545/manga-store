import useAccountVerification from "./useAccountVerification";
import useUpdatePassword from "./useUpdatePassword";

function useAccount() {
  const accountVerification = useAccountVerification();
  const updatePassword = useUpdatePassword();

  return {
    verification: accountVerification,
    password: updatePassword,
  };
}

export default useAccount;
