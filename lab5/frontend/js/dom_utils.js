import { deleteHotel } from "./index.js"

export const findButton = document.getElementById("search-name-hotel")
export const clearFind = document.getElementById("clear-name-hotel")

const editHotelInputId = document.getElementById("edit-hotel--id")
const editHotelInputName = document.getElementById("edit-hotel--name")
const editHotelInputTotalVisitors = document.getElementById("edit-hotel--total-visitors")
const editHotelInputTotalRooms = document.getElementById("edit-hotel--total-rooms")


const hotelsContainer = document.getElementById("items-hotels")

const findInput = document.getElementById("input-name-hotel")

export const sortByButton = document.getElementById("sort-button")
const sortByOptionsButtons = document.querySelectorAll('input[name="sort-by"]');
export const modalWindow = document.getElementById("modal-window")

const hotelTemplate = ({ id, name, total_visitors, total_rooms }) => `
<li id="${id}" class="hotels__list--item">
  <div class="hotels__hotel">
    <h4>${name}</h4>
    <div class="one-row">
      <p>Total visitors: </p>
      <p>${total_visitors}</p>
    </div>
    <div class="one-row">
      <p>Total rooms: </p>
      <p>${total_rooms}</p>
    </div>
    <div class="hotels__hotel--controls">
      <button type="button" id="edit-hotel ${id}">Edit</button>
      <button type="button" id="delete-hotel ${id}">Delete</button>
    </div>
  </div>
</li>
`;

export const clearFindInput = () => {
  findInput.value = "";
};

const fillEditHotelForm = ({ id, name, total_rooms, total_visitors }) => {
  editHotelInputId.value = id;
  editHotelInputName.value = name;
  editHotelInputTotalRooms.value = total_rooms;
  editHotelInputTotalVisitors.value = total_visitors
}

export const clearEditHotelForm = () => {
  fillEditHotelForm({ id: "", name: "", total_rooms: "", total_visitors: "" })
}


export const addHotelToPage = ({ id, name, total_visitors, total_rooms }) => {
  hotelsContainer.insertAdjacentHTML(
    "beforeend",
    hotelTemplate({ id, name, total_visitors, total_rooms })
  );

  const deleteButton = document.getElementById(`delete-hotel ${id}`);
  deleteButton.addEventListener("click", async (event) => {
    if (confirm(`Do you want to delete ${name}`)) {
      id = deleteButton.getAttribute("id").split(" ")[1];
      deleteHotel({ id, name, total_visitors, total_rooms });
    }
  });

  const editButton = document.getElementById(`edit-hotel ${id}`);
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    id = editButton.getAttribute("id").split(" ")[1];
    localStorage.setItem("hotel_to_edit", JSON.stringify({ id, name, total_visitors, total_rooms }))
    window.location.href = "./edit_hotel.html"
  });
};

export const renderHotelsList = (hotels) => {
  hotelsContainer.innerHTML = "";
  for (const hotel of hotels) {
    addHotelToPage(hotel)
  }
};


export const getEditHotelDataInput = () => {
  return {
    id: editHotelInputId.value,
    name: editHotelInputName.value,
    total_rooms: editHotelInputTotalRooms.value,
    total_visitors: editHotelInputTotalVisitors.value,
  };
};


export const getFindDataInput = () => {
  return {
    name: findInput.value
  };
};

export const getSotrOption = () => {
  let selectedButton;
  for (const sortByOption of sortByOptionsButtons) {
    if (sortByOption.checked) {
      selectedButton = sortByOption.value;
      break;
    }
  }
  console.log(selectedButton)
  return selectedButton;
};
