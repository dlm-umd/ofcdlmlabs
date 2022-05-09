// let dataHandler = (arr) => {
//     let pref = document.querySelector("#pref").value;
//     let ans = "<li><h4>Restaurants Lists </h4></li><br>";
//     
// }
// ul.innerHTML = ans;
// console.table(arr);
// }

let injector = (arr) => {
    let ul = document.querySelector("#resto-list")
    let ans = "<li><h4>Restaurants List</h4></li><br>";
    for (let i = 0; i < arr.length; ++i) {
        ans += "<li>" + arr[i].name + "</li>"
    }
    ul.innerHTML = ans;
}

let randomizer = (arr) => {
    let re = []
    for (let i = 0; i < 15; ++i) {
        ran = Math.floor(Math.random() * (999 - 9)) + 0;
        re.push(arr[ran])
    }
    return re;
}

async function mainEvent() { // the async keyword means we can make API requests
    const sub = document.querySelector("#btn");
    const rname = document.querySelector("#rname");
    const ftype = document.querySelector("#pref")
    sub.style.display = "none";
    const form = document.querySelector('.main_form');
    const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    if (arrayFromJson.data.length > 0) {
        sub.style.display = "block";
        let currentArray;
        form.addEventListener('submit', async(submitEvent) => { // async has to be declared all the way to get an await
            submitEvent.preventDefault(); // This prevents your page from refreshing!
            console.log('form submission'); // this is substituting for a "breakpoint"
            // arrayFromJson.data - we're accessing a key called 'data' on the returned object
            // it contains all 1,000 records we need
            currentArray = randomizer(arrayFromJson.data)
            injector(currentArray)

        });
        rname.addEventListener("input", (e) => {
            if (currentArray === undefined) { return } //
            else {
                let res = currentArray.filter(obj => {
                    let oo = obj.name.toLowerCase()
                    let tt = e.target.value.toLowerCase()
                    return oo.includes(tt)
                })
                injector(res)
            }
        })
    }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async() => mainEvent()); // the async keyword means we can make API requests