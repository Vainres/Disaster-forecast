import MapLo from '~/Layout/Map';
import { LoadScript } from "@react-google-maps/api";
  

function Home() {
    const key = 'AIzaSyAhoAQJ5a09Kw3CIdRKYCgwUdEvhRtO7BU';
    const lib = ["places"];
    return ( 
        <div style = {
            { height: '500px', width: '50%', backgroundColor: 'yellow' } } >
            <LoadScript googleMapsApiKey={key} libraries={lib}>
            <MapLo 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=Home`}
            key={7} lat={10} long={100} />
            </LoadScript>
            
            

        </div>
    );
}
export default Home;