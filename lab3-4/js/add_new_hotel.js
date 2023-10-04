const addNewHotelButton = document.getElementById("add-new-hotel--button")

const newHotelInputName = document.getElementById("add-new-hotel--name")
const newHotelInputTotalVisitors = document.getElementById("add-new-hotel--total-visitors")
const newHotelInputTotalRooms = document.getElementById("add-new-hotel--total-rooms")

const getHotelDataInput = () => {
    return {
        name: newHotelInputName.value,
        total_rooms: newHotelInputTotalRooms.value,
        total_visitors: newHotelInputTotalVisitors.value,
    };
};

const clearNewHotelInput = () => {
    newHotelInputName.value = "";
    newHotelInputTotalRooms.value = "0";
    newHotelInputTotalVisitors.value = "0";
  };
  

const addHotel = ({ name, total_visitors, total_rooms }) => {
    const hotels = localStorage.getItem("hotels") ? JSON.parse(localStorage.getItem("hotels")) : [];
    const generateId = uuid.v1()

    const newHotel = {
        id: generateId,
        name: name,
        total_visitors: total_visitors,
        total_rooms: total_rooms,
    }

    hotels.push(newHotel)
    console.log(hotels)
    localStorage.setItem("hotels", JSON.stringify(hotels))
};


addNewHotelButton.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("here")
    const { name, total_visitors, total_rooms } = getHotelDataInput()
    clearNewHotelInput()
    if (name == "" || total_visitors == "" || total_rooms == "") {
        alert("Hotel must have all field")
        return
    };
    addHotel({ name, total_visitors, total_rooms });
    alert("Hotel added")
});