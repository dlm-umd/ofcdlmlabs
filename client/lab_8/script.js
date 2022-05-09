let initMap = () => {
    var map = L.map('map').setView([38.9897, -76.9378], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoianJvYmluMzM5MSIsImEiOiJjbDIzaHUzdHowMWt6M2RxbTV3YnFtNXhnIn0.kVMKbryuySoDTsF7c-2I2A'
    }).addTo(map);
    return map;
}

let markerPlace = (map, arr) => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });
    for (let i = 0; i < 5; ++i) {
        if (arr[i] != undefined) {
            if (arr[i].geocoded_column_1 != undefined) {
                let coords = arr[i].geocoded_column_1?.coordinates;
                L.marker([coords[1], coords[0]]).addTo(map)
            }
        }
        if (arr[0] != undefined) {
            let coords = arr[0].geocoded_column_1 ?.coordinates;
            map.panTo([coords[1], coords[0]])
        }
    }
}


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
    let pm = initMap();

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
            markerPlace(pm, currentArray)
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
                markerPlace(pm, res)
            }
        })
    }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async() => mainEvent()); // the async keyword means we can make API requests