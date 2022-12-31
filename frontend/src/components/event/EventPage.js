

const EventPage = () => {

    return(
        <div className="small-cart-sections p-3">
            <div className="cart-section">
                <p>Event Name:</p>
                <span>100</span>
            </div>
            <div className="cart-section">
                <p>Event Description:</p>
                <span>200 LE</span>
            </div>
            <div className="cart-section">
                <p>Current amount:</p>
                <span>200 LE</span>
            </div>
            <div className="cart-section">
                <p>Desired amount:</p>
                <span>200 LE</span>
            </div>

            <div className="cart-section" style={{height:"100%"}}>
                <p>donation amount:</p>
                {/* <input></input> */}
                <button onClick={()=>{}} className="add-item">Donate</button>
                <button className="mt-2 p-2 red-button">Back to Events</button>
            </div>
            
        </div>
                
    )
}

export default EventPage;