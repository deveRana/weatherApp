import React ,{ useEffect , useState} from 'react'
import './App.css';
import axios from 'axios';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiTempColdLine } from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi';


function App() {

  const [data, setData] = useState({});
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const fetchWeather = async ()=>{
    
    const res = await axios(`http://api.weatherapi.com/v1/current.json?key=140b8dad811840b4ab4125536212210&q=${lat},${lon}&aqi=no` , {
      header : 'Access-Control-Allow-Origin'
    } )
    
    setData(res.data)

  }

  const getCity = ()=>{

      const geoSuccess = (position)=>{
         setLat(position.coords.latitude)
         setLon(position.coords.longitude)
      }

      if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }else{
          console.log("Something WEnt Wrong");
        }

      

  }  
  

  useEffect( ()=>{
    getCity();

  } , [] )

  useEffect(()=>{
    fetchWeather();
  },[lon] )




  return (
    <div className="appContainer">

      <div className="container">
         
         <div className="upperContainer">

              <div className="weatherType">
                    <p> {  Object.keys(data).length > 0 ? data.current.condition.text : ''}  </p> 
              </div>

               <div className="weatherTypePng">
                         <img src={Object.keys(data).length > 0 ? data.current.condition.icon : ''}   alt="" srcset="" />
                </div>

              <div className="cityTemperature">
                  <p> <span> {  Object.keys(data).length > 0 ? data.current.temp_c : '' } </span> °C </p>
              </div>

              <div className="cityLoca">
                  <p>  <HiOutlineLocationMarker/>  <span> {  Object.keys(data).length > 0 ? data.location.name : ''} </span> , <span> {  Object.keys(data).length > 0 ? data.location.region : ''} </span> </p>
              </div>

         </div>


          <div className="lowerContainer">

                    <div className="leftLowerContainer">

                          <div className="latitude">
                                <p> Lat : <span> {  Object.keys(data).length > 0 ? (data.location.lat) : ''} </span> </p>
                          </div>
                          <div className="feelLike">

                            <div className="icon-1">
                                <RiTempColdLine/>
                            </div>
 
                            <div className="values">
                              <span>  {  Object.keys(data).length > 0 ? data.current.feelslike_c : '' }  °C </span> 
                              <p>Feels Like</p>
                            </div>

                          </div>

                    </div>

                    <div className="rightLowerContainer">

                          <div className="longitude">
                               <p> Lon : <span> { Object.keys(data).length > 0 ? (data.location.lon) : ''} </span> </p>
                          </div>

                          <div className="humidity">

                              <div className="icon-2">
                                    <WiHumidity/>
                                </div>

                                <div className="values">
                                  <span> { Object.keys(data).length > 0 ? data.current.humidity : ''}  %</span> 
                                  <p>Humidity</p>
                                </div>

                          </div>

                    </div>

          </div>

      </div>

    </div>
  );
}

 

export default App;