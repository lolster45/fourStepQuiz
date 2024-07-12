//React...
import { useContext, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

//Components...
import { MyContext } from "../App"


const Summary = () => {
    const {form, setForm, setPageNumber, setPath, setEmailErr} = useContext(MyContext)

    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        setPath(location.pathname)
    }, [])

    const findPlanPrice = (plan, year) => {
        if(!year) {
            switch(plan) {
                case "Arcade": 
                    return "9"
                case "Advanced": 
                    return "12"
                case "Pro": 
                    return "15"
                default: "0"
            }
        } 
        else if (year) {
            switch(plan) {
                case "Arcade": 
                    return "108"
                case "Advanced": 
                    return "144"
                case "Pro": 
                    return "180"
                default: "0"
            }
        }  
    }

    const handleSubmitForm = () => {
        if (!form["plan-type"] || form["total"] === 0) {
            console.log("failed to submit")
            return;
        }
        console.log(form)
        setForm({
            "name": "",
            "email": "",
            "phone-number": "",
            "plan-type": "",
            "yearly": false,
            "add-ons": {
            "online-services": false,
            "larger-storage": false,
            "customizable-profile": false
            },
            "total": 0
        })  
        setEmailErr(false);
        navigate("/")
    }

    return (
        <section className="summary-wrap">
            <h1 className="title">Finishing up</h1>
            <p className="paragraph">Double-check everything looks OK before confirming.</p>
            <div className="order">
                {!form["plan-type"] &&
                    <h2>No plan selected...</h2>
                }
                {form["plan-type"] &&
                    <div className="user-order-details">
                        <span>{form["plan-type"]} ({form["yearly"] ? "Yearly" : "Monthly"})</span>
                        <span>{`+$${findPlanPrice(form["plan-type"], form["yearly"])}/`}{form["yearly"] ? "yr" : "mo"}</span>
                    </div>
                }
                <hr/>
                <div className="user-addOns">
                    {form["add-ons"]["online-services"] &&
                        <div>
                            <span>Online Service</span>
                            {!form["yearly"] && <span>+$1/mo</span>}
                            {form["yearly"] && <span>+$12/yr</span>}
                        </div>
                    }
                    {form["add-ons"]["larger-storage"] &&
                        <div>
                            <span>Larger Storage</span>
                            {!form["yearly"] && <span>+$2/mo</span>}
                            {form["yearly"] && <span>+$24/yr</span>}
                        </div>
                    }
                    {form["add-ons"]["customizable-profile"] &&
                        <div>
                            <span>Customizable Profile</span>
                            {!form["yearly"] && <span>+$2/mo</span>}
                            {form["yearly"] && <span>+$24/yr</span>}
                        </div>
                    }
                </div>
            </div>
            <div className="summary-total">
                <span>Total(per-{form["yearly"] ? "year" : "month"})</span>
                <span>{`+$${form["total"]}/${form["yearly"] ? "yr" : "mo"}`}</span>
            </div>
            <span className="page-form-nav">
                <Link to="/AddOns">
                    <button className="go-back" onClick={() => setPageNumber("3")}>Go Back</button>
                </Link>
                <button className="buttonAdd-nextPage" onClick={handleSubmitForm}>Confirm</button>
            </span>
        </section>
    )
}
export default Summary