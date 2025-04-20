import { SpinnerContainer } from "./SpinnerContainer";

function LoadingScreen() {
  return (
    <SpinnerContainer
      containerProps={{
        className: "flex-1 flex items-center justify-center",
      }}
      spinnerProps={{ className: "size-32" }}
    />
  );
}

export default LoadingScreen;
