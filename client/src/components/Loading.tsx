import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <Spinner color="secondary" size="lg" />
    </div>
  );
};

export default Loading;
