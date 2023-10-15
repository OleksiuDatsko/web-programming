import {
    editHotel
} from "./api.js"

const confirmEditButton = document.getElementById("confirm-edit-hotel")

const editHotelInputId = document.getElementById("edit-hotel--id")
const editHotelInputName = document.getElementById("edit-hotel--name")
const editHotelInputTotalVisitors = document.getElementById("edit-hotel--total-visitors")
const editHotelInputTotalRooms = document.getElementById("edit-hotel--total-rooms")

const hotel_to_edit = JSON.parse(localStorage.getItem("hotel_to_edit"));

const fillEditHotelForm = ({ id, name, total_rooms, total_visitors }) => {
    editHotelInputId.value = id;
    editHotelInputName.value = name;
    editHotelInputTotalRooms.value = total_rooms;
    editHotelInputTotalVisitors.value = total_visitors
}

const getEditHotelDataInput = () => {
    return {
        id: editHotelInputId.value,
        name: editHotelInputName.value,
        total_rooms: editHotelInputTotalRooms.value,
        total_visitors: editHotelInputTotalVisitors.value,
    };
};

const editeHotel = (new_hotel_info) => {
    editHotel(new_hotel_info.id, new_hotel_info)
};

confirmEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    const hotel = getEditHotelDataInput();
    editeHotel(hotel);
    window.location.href = "."
});

fillEditHotelForm(hotel_to_edit)