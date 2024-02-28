const loadPhon = async (searchText, isshowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isshowAll);
};

const displayPhone = (phones, isshowAll) => {
  //   console.log(phones);
  //   1. catch the parent
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  //   disply show all button if there aere more then 12 phones
  const showContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isshowAll) {
    showContainer.classList.remove("hidden");
  } else {
    showContainer.classList.add("hidden");
  }
  //   clear phone container cards before adding new cards
  if (!isshowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phones) => {
    // console.log(phones);
    //2. craeat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    // 3. set inner gtml
    phoneCard.innerHTML = `<figure>
    <img
      src="${phones.image}"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phones.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick='handleShowDetail("${phones.slug}")' class="btn btn-primary">Show details</button>
    </div>
  </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// handel search
const handleSearch = (isshowAll) => {
  toggleLoadingSpinner(true);
  const searchFild = document.getElementById("search-fild");
  const searchText = searchFild.value;
  console.log(searchText);
  loadPhon(searchText, isshowAll);
};

const toggleLoadingSpinner = (isloading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isloading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
//
const handleShowDetail = async (id) => {
  console.log("clicked", id);
  //   load single data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("phone-name");

  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p><span>Storeg:</span>${phone?.manFeatures?.storage}</p>
  <p><span>Gps:</span>${phone.others?.GPS || "No GPS available"}</p>
  `;
  show_detail_modal.showModal();
};

// handle show all
const handelShowAll = () => {
  handleSearch(true);
};
// loadPhon();
