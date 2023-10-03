function openDialog(clickedDiv) {
  let roomNum = clickedDiv.firstElementChild.innerHTML;
  var classNames = clickedDiv.className.split(" ");
  for (var i = 0; i < classNames.length; i++) {
    var className = classNames[i];
    if (className !== "room-frame") {
      document.querySelector("dialog > .Hos-Name").nodeValue = roomNum;
      document.getElementById(className).showModal();

    }
  }
}




function closeDialog(dialogId) {
  if (dialogId == 'avail') {
    alert('Do you want to close this tab?')
  }
  document.getElementById(dialogId).close();
}

async function fetchRoomInfo(query) {
  try {
    const response = await fetch(`http://localhost:3000/rooms${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room information:', error);
    throw error;
  }
}

async function displayRoomInfo(query) {
  const roomInfoDiv = document.getElementById('roomInfo');
  roomInfoDiv.innerHTML = 'Loading room information...';

  try {
    const roomData = await fetchRoomInfo('');

    let roomsHTML = '';

    roomData.rooms.forEach(room => {
      let occupied_message = "";
      let occupied_class = "";
      if (room.isOccupied === true) {
        occupied_message = "Reserved"
        occupied_class = "no-avail"
      } else if (room.isOccupied === false) {
        occupied_message = "Available"
        occupied_class = "avail"
      }
      roomsHTML += `
      <div class="room-frame ${occupied_class} no-margin" onclick="openDialog(this)">
            <h1 id="room-number" class="no-margin">R. ${room.room_id}</h1>
            <h1 id="availabilty" class="no-margin">${occupied_message}</h1>
            </div>
        `;
    });

    roomInfoDiv.innerHTML = `${roomsHTML}`;
  } catch (error) {
    roomInfoDiv.innerHTML = `<p>Error fetching room information. Please try again later.</p>`;
  }
}

displayRoomInfo('');


function filter_floor(floor) {
  const rooms = document.querySelectorAll('.room-frame');
  rooms.forEach(room => {
    if (floor !== 'all') {
      room.style.display = 'block';
      const num_div = room.querySelector('#room-number');
      const floor_num = num_div.innerHTML.charAt(3)
      console.log(floor_num)
      if (floor_num != floor) {
        room.style.display = 'none';
      } else {
        room.style.display = 'block';
      }
    } else {
      room.style.display = 'visible';
    }

  });

}