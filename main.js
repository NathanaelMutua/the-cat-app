const factCount = document.getElementById("cat-facts-count");
const photoCount = document.getElementById("cat-photos-count");
const photoBtn = document.getElementById("photo-submit-btn");
const factBtn = document.getElementById("fact-submit-btn");
const displayedFactsHolder = document.querySelector(".result-content-holder");
const spinner = document.getElementById("spinner");
const spinnerWrapper = document.querySelector(".spinner-wrapper");

// assigning data values to an ordered list that we can output
let getDataFacts = function (array) {
  let factListItems = ""; // this will hold the list items
  for (let i = 0; i < array.length; i++) {
    factListItems += `<li>${array[i]}</li>`; // this adds the values one after the other to the list as list items
  }
  const factList = `<ol>${factListItems}</ol>`;
  return factList;
};

// activating the spinner
function startSpinner() {
  spinnerWrapper.style.display = "block";
  spinner.style.display = "block";
}

// deactivation the spinner
function stopSpinner() {
  spinnerWrapper.style.display = "none";
  // spinner.style.display = "none";
}

// function to get the image URLs from the image data object
function getDataPhotos(object, len) {
  let photoListItems = "";
  for (let i = 0; i < len; i++) {
    let photoKeyValue = object[i];
    let height = photoKeyValue.height;
    let width = photoKeyValue.width;
    let id = photoKeyValue.id;

    photoListItems += `<div class="displayed-image-wrapper"><img class="displayed-image" src="https://cdn2.thecatapi.com/images/${id}.jpg" height="${height}" width="${width}" /></div>`; // this should give me some flexibility in styling the element
  }
  const photoList = `<div class="displayed-images-container">${photoListItems}</div>`;
  return photoList;
}

factBtn.addEventListener("click", async function getFacts() {
  displayedFactsHolder.innerHTML = null;
  startSpinner();

  let factCountValue = Number(factCount.value);
  const maxfactValue = 50;

  // I want to ensure that the value being entered is not more than 50, if it is, the max will be 50
  if (factCountValue > 50) {
    factCountValue = maxfactValue;
  } else if (factCountValue === 0) {
    factCountValue = 1; // I realiesd for 0 values the output always has atleast one fact
  }

  try {
    const response = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${factCountValue}`
    );
    const data = response.data.data; // this gives us the array

    stopSpinner();

    displayedFactsHolder.innerHTML = getDataFacts(data);
  } catch (error) {
    console.error("Error");
  }
});

// getting cat photos
photoBtn.addEventListener("click", async function () {
  displayedFactsHolder.innerHTML = null;
  startSpinner();

  let photoCountValue = photoCount.value;
  const maxPhotoValue = 10;

  // the sample site gives data even when thedata is 0 or more than 10, but not more than 10
  if (photoCountValue == 0) {
    photoCountValue = 1;
  } else if (photoCountValue > maxPhotoValue) {
    photoCountValue = maxPhotoValue;
  }

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${photoCountValue}`
    );
    const data = response.data;

    console.log(data);

    stopSpinner();

    console.log(getDataPhotos(data, photoCountValue));
    displayedFactsHolder.innerHTML = getDataPhotos(data, photoCountValue);
  } catch (error) {
    console.error("Error");
  }
});
