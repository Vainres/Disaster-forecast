import MapLo from '~/Layout/Map';
function Home() {
    //const key = 'AIzaSyCk1uOylCc-hAY61rQojz9bQ7luSTkWQy0';

    return (
        <div style={{ height: '500px', width: '50%', backgroundColor: 'yellow' }}>
            <MapLo key={7} lat={10} long={100} />
        </div>
    );
}

export default Home;
