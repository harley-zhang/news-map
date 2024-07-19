const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-300 w-72 m-5 p-5 flex flex-col justify-start">
        <h1 className="text-4xl font-bold">News Map</h1>
        <p className="mt-4 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </p>
      </div>
      <div className="flex-grow p-5">
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default Home;
