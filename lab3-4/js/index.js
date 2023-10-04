import {
  clearFindInput,
  clearEditHotelForm,
  renderHotelsList,
  getFindDataInput,
  findButton,
  clearFind,
  sortByButton,
  getSotrOption,
  getEditHotelDataInput,
  modalWindow,
} from "./dom_utils.js"

const countButton = document.getElementById("count")
const countTotalVisitorsOutput = document.getElementById("total-visitors")

const confirmEditButton = document.getElementById("confirm-edit-hotel")

const hotels = localStorage.getItem("hotels") ? JSON.parse(localStorage.getItem("hotels")) : [];


export const deleteHotel = (hotel_to_delete) => {
  const hotel_index = hotels.findIndex((hotel) => hotel.id === hotel_to_delete.id);
  if (hotel_index !== -1) {
    hotels.splice(hotel_index, 1);
    localStorage.setItem("hotels", JSON.stringify(hotels));
    renderHotelsList(hotels);
  } else {
    console.log("Hotel not found in the array.");
  }
};

export const editeHotel = (new_hotel_info) => {
  const hotel_index = hotels.findIndex((hotel) => hotel.id === new_hotel_info.id);
  if (hotel_index !== -1) {
    hotels[hotel_index] = new_hotel_info;
    localStorage.setItem("hotels", JSON.stringify(hotels));
    renderHotelsList(hotels);
  } else {
    console.log("Hotel not found in the array.");
  }
};

confirmEditButton.addEventListener("click", (event) => {
  event.preventDefault();
  const hotel = getEditHotelDataInput();
  editeHotel(hotel);
  clearEditHotelForm();
  modalWindow.classList.remove("open");
});


countButton.addEventListener("click", (event) => {
  event.preventDefault();
  let count = hotels.reduce((count, hotel) => count += Number(hotel.total_visitors), 0);
  countTotalVisitorsOutput.innerText = count
});

findButton.addEventListener("click", (event) => {
  event.preventDefault();
  const { name } = getFindDataInput();
  const foundHotels = hotels.filter((hotel) => hotel.name.search(name) !== -1);
  renderHotelsList(foundHotels);
});

clearFind.addEventListener("click", (event) => {
  event.preventDefault();
  renderHotelsList(hotels);
  clearFindInput();
});

sortByButton.addEventListener("click", (event) => {
  event.preventDefault();
  const sortOption = getSotrOption();
  let sortedHotels;
  if (sortOption == "name") {
    sortedHotels = hotels.sort((hotel1, hotel2) => {
      const hotel1_name = hotel1.name.toUpperCase();
      const hotel2_name = hotel2.name.toUpperCase();
      if (hotel1_name < hotel2_name) {
        return -1;
      }
      if (hotel1_name > hotel2_name) {
        return 1;
      }
      return 0;
    });
  } else if (sortOption == "total_rooms") {
    sortedHotels = hotels.sort((hotel1, hotel2) => {
      const hotel1_total_rooms = Number(hotel1.total_rooms);
      const hotel2_total_rooms = Number(hotel2.total_rooms);
      if (hotel1_total_rooms < hotel2_total_rooms) {
        return -1;
      }
      if (hotel1_total_rooms > hotel2_total_rooms) {
        return 1;
      }
      return 0;
    });
  } else if (sortOption == "total_visitors") {
    sortedHotels = hotels.sort((hotel1, hotel2) => {
      const hotel1_total_visitors = Number(hotel1.total_visitors);
      const hotel2_total_visitors = Number(hotel2.total_visitors);
      if (hotel1_total_visitors < hotel2_total_visitors) {
        return -1;
      }
      if (hotel1_total_visitors > hotel2_total_visitors) {
        return 1;
      }
      return 0;
    });
  };
  console.log(sortedHotels)
  renderHotelsList(sortedHotels)
});

renderHotelsList(hotels)

