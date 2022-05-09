let dataHandler = (arr) => {
    let ul = document.querySelector("#resto-list")
    let ans = "<li><h4>Restaurants Lists </h4></li><br>";
    for (let i = 0; i < 15; ++i) {
        ran = Math.floor(Math.random() * (999 - 9)) + 0;
        ans += "<li>" + arr[ran].name + "</li>"
    }
    ul.innerHTML = ans;
    console.table(arr);
}

async function mainEvent() { // the async keyword means we can make API requests
    const sub = document.querySelector("#btn");
    sub.style.display = "none";
    const form = document.querySelector('.main_form');
    const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    if (arrayFromJson.data.length > 0) {
        sub.style.display = "block";
        form.addEventListener('submit', async(submitEvent) => { // async has to be declared all the way to get an await
            submitEvent.preventDefault(); // This prevents your page from refreshing!
            console.log('form submission'); // this is substituting for a "breakpoint"
            // arrayFromJson.data - we're accessing a key called 'data' on the returned object
            // it contains all 1,000 records we need
            dataHandler(arrayFromJson.data)
        });
    }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async() => mainEvent()); // the async keyword means we can make API requests