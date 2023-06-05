import "./PinPoint.css";

function PinPointStatic(props){
    return(
        <div class="pin-point__wrapper">
            <p className="pin-point__title">{ props.attraction_name }</p>
            <div class="pin-point"></div>
        </div>
    )
}

export default PinPointStatic;