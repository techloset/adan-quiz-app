import Loader from "@/components/Loader";
const loading = () => {
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <Loader/>
    </div>
  );
};

export default loading;
