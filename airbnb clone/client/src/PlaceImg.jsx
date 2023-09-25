import config from "./pages/config.jsx";
export default function PlaceImg({place,index = 0,myclassName = null}){
    const backendurl = config.development.backendUrl + '/upload/';
    if(!place.photos?.length){
        return '';
    }
    if(!myclassName){
        myclassName = "object-cover";
    }
    return(
        <img className = {myclassName} src={backendurl+place.photos[index]} alt=""/>
    )
}