function RestaurantButton({ restaurantName, handleClick, id }) {
  return (
    <button
      onClick={handleClick}
      id={id}
      className="bg-white py-5 border-cyan-500 border-2 rounded-sm text-3xl font-medium w-full"
    >
      {restaurantName}
    </button>
  );
}

export default RestaurantButton;
