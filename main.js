const factCount = document.getElementById("cat-facts-count");
const photoCount = document.getElementById("cat-photos-count");
const photoBtn = document.getElementById("photo-submit-btn");
const factBtn = document.getElementById("fact-submit-btn");
const displayedFactsHolder = document.querySelector(".result-content-holder");
const spinner = document.getElementById("spinner");


// assigning data values to an ordered list that we can output
let getDataFacts = function(array){
    let factListItems = ""; // this will hold the list items
    for (let i = 0; i < array.length; i++){
        factListItems += `<li>${array[i]}</li>`;// this adds the values one after the other to the list as list items
    }
    const factList = `<ol>${factListItems}</ol>`;
    return factList
}

// activating the spinner
function startSpinner(){
    spinner.style.display = "block";
}

// deactivation the spinner
function stopSpinner(){
    spinner.style.display = "none";
}


factBtn.addEventListener("click", async function getFact(){
    displayedFactsHolder.innerHTML = null;
    startSpinner()

    let factCountValue = Number(factCount.value);
    let maxfactValue = 50;

    // I want to ensure that the value being entered is not more than 50, if it is, the max will be 50
    if (factCountValue > 50){
        factCountValue = maxfactValue;
    } else if (factCountValue === 0){
        factCountValue = 1; // I realiesd for 0 values the output always has atleast one fact
    }

    try{
        const response = await axios.get(`https://meowfacts.herokuapp.com/?count=${factCountValue}`)
        const data = response.data.data; // this gives us the array
        
        stopSpinner()

        displayedFactsHolder.innerHTML = getDataFacts(data);
        

    } catch (error){
        console.error();
    }
    
})

// photoBtn.addEventListener("click", function(){
//     let photoCountValue = photoCount.value;
//     console.log(photoCountValue);
// })