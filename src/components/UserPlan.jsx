//React...
import { useContext, useEffect, useState } from "react"
import { Link, useLocation} from "react-router-dom"

//Components...
import { MyContext } from "../App"

//React icons...
import Arcade from "../images/icon-arcade.svg"
import Advanced from "../images/icon-advanced.svg"
import Pro from "../images/icon-pro.svg"



const UserPlan = () => {
    const {form, setForm, setPageNumber, setPath} = useContext(MyContext)
    const [switchOn, setSwitchOn] = useState(false);

    const location = useLocation()
    
    useEffect(() => {
        setPath(location.pathname)
    }, [])

    
    const handleClick = (e) => {
        let planType = e.currentTarget.value, 
            price = 0, 
            addOnPrice = 0;

        
        let s1 = form["add-ons"]["online-services"], 
            s2 = form["add-ons"]["larger-storage"], 
            s3 = form["add-ons"]["customizable-profile"];

        if(s1) {
            addOnPrice += form["yearly"] ? 12 : 1
        }
        if(s2) {
            addOnPrice +=  form["yearly"] ?  24 : 2 
        }
        if(s3) {
            addOnPrice += form["yearly"] ? 24 : 2
        }
        

        if(planType === "Arcade") {
            price = form["yearly"] ? 108 : 9
        } 
        else if (planType === "Advanced") {
            price = form["yearly"] ?  144 : 12 
        } 
        else if (planType === "Pro") {
            price = form["yearly"] ? 180 : 15
        }
    
        setForm(prev => ({
            ...prev,
            "plan-type": planType,
            "total": price + addOnPrice
        }))
    }

    const handleSwitch = () => {
        setSwitchOn(prev => !prev)
        setForm(prev => ({
            ...prev,
            "plan-type": "",
            "total": 0,
            "yearly": !prev["yearly"]
        }))
    }

    return (
        <section className="user-plan-wrap">
            <h1 className="title">Select your plan</h1>
            <p className="paragraph">Your have the option for montly or yearly billing</p>
            <div className="select-plans">
                <button 
                    onClick={handleClick} 
                    className={`individual-plan ${form['plan-type'] === "Arcade" ? "active" : null}`} 
                    value="Arcade"
                >
                    <img src={Arcade} />
                    <div>
                        <span>Arcade</span>
                        {!form["yearly"] && <span>$9/mo</span>}
                        {form["yearly"] && <span>$108/yr</span>}
                    </div>
                </button>
                <button 
                    onClick={handleClick} 
                    className={`individual-plan ${form['plan-type'] === "Advanced" ? "active" : null}`}  
                    value="Advanced"
                >
                    <img src={Advanced}/>
                    <div>
                        <span>Advanced</span>
                        {!form["yearly"] && <span>$12/mo</span>}
                        {form["yearly"] && <span>$144/yr</span>}
                    </div>
                </button>
                <button 
                    onClick={handleClick} 
                    className={`individual-plan ${form['plan-type'] === "Pro" ? "active" : null}`} 
                    value="Pro"
                >
                    <img src={Pro}/>
                    <div>
                        <span>Pro</span>
                        {!form["yearly"] && <span>$15/mo</span>}
                        {form["yearly"] && <span>$180/yr</span>}
                    </div>
                </button>
            </div>
            <div className="monthly-yearly-subscription">
                <h5 className={form["yearly"] ? null : "active"}>Monthly</h5>
                <label className="switch">
                    <input type="checkbox" onChange={handleSwitch} checked={form["yearly"]}/>
                    <span className="slider"></span>
                </label>
                <h5 className={form["yearly"] ? "active" : null}>Yearly</h5>
            </div>
            <span className="page-form-nav">
                <Link to="/">
                    <button className="go-back" onClick={() => setPageNumber("1")}>Go Back</button>
                </Link>
                <Link to="/AddOns">
                    <button className="buttonAdd-nextPage" onClick={() => setPageNumber("3")}>Next</button>
                </Link>
            </span>
        </section>
    )
}

export default UserPlan