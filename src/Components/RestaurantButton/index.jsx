function RestaurantButton({ restaurantName, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="bg-white py-5 border-cyan-500 border-2 rounded-sm text-3xl font-medium w-full"
    >
      {restaurantName}
    </button>
  );
}

export default RestaurantButton;
