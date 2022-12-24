
let tempMarkers = [];

tempMarkers = data?.map((obj, key) => {
    if (obj["Company_Location_Geo"]) {
        let coordinate = obj["Company_Location_Geo"].split(",");

        let lat = Number(coordinate[0] ? coordinate[0].replace('"', "") : "");
        let lng = Number(coordinate[1] ? coordinate[1].replace('"', "") : "");

        return { id: key, position: { lat: lat, lng: lng } };
    } else if (obj["Company_Location_Name"] != "") {
        let city = obj["Company_Location_Name"]
            ? obj["Company_Location_Name"].replaceAll('"', "")
            : "";

        Geocode.fromAddress(city).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                return { id: key, position: { lat: lat, lng: lng } };
            },
            (error) => {
                console.error(error);
            }
        );
    }
});

tempMarkers = tempMarkers?.filter(function (element) {
    return element != undefined;
});