const NotFound = () => {
  return (
    <div className="absolute inset-0 bg-amber-100 z-[1000px] h-[100vh] w-[100vw] place-content-center">
      <div className="flex-col gap-2 text-[#000000] text-center">
        <div className="text-4xl font-bold">404</div>
        <div className="text-2xl font-bold">Not found...</div>
        <div className="font-medium">
          The page you are looking for does not exist.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
