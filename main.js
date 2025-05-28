let factCount = document.getElementById("cat-facts-count");
let photoCount = document.getElementById("cat-photos-count");
let photoBtn = document.getElementById("photo-submit-btn");
let factBtn = document.getElementById("fact-submit-btn");


factBtn.addEventListener("click", async function getFact(){
    let factCountValue = Number(factCount.value);
    let maxfactValue = 50;

    // I want to ensure that the value being entered is not more than 50, if it is, the max will be 50
    if (factCountValue > 50){
        factCountValue = maxfactValue;
    } else if (factCountValue === 0){
        factCountValue = 1;// I realiesd for 0 values the output always has atleast one fact
    }

    try{
        const response = await axios.get(`https://meowfacts.herokuapp.com/?count=${factCountValue}`)
        const data = response.data;
        console.log(data);

    } catch (error){
        console.error();
    }
    
})

// photoBtn.addEventListener("click", function(){
//     let photoCountValue = photoCount.value;
//     console.log(photoCountValue);
// })