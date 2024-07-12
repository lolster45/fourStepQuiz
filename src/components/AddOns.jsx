//React...
import { useContext, useEffect } from "react"
import { Link, useLocation} from "react-router-dom"
import { MyContext } from "../App"

const AddOns = () => {

    const {form, setForm, setPageNumber, setPath} = useContext(MyContext)

    const location = useLocation()
    
    const handleClick = (e) => {
        if(form["total"] === 0) {
            console.log("error, you need to select a plan first")
            return;
        }

        let service = e.target.name, checked = e.currentTarget.checked, reducer = 0

        if(!form["yearly"]) {
            if(service === "online-services") {
                reducer = -1
            } else if (service === "larger-storage") {
                reducer = -2
            } else if (service === "customizable-profile") {
                reducer = -2
            }
        } else {
            if(service === "online-services") {
                reducer = -12
            } else if (service === "larger-storage") {
                reducer = -24
            } else if (service === "customizable-profile") {
                reducer = -24
            }
        }

        setForm(prev => ({
            ...prev,
            "add-ons": {
                ...prev["add-ons"],
                [service]: !prev["add-ons"][service]
            },
            "total": checked ? prev["total"] - reducer : prev["total"] + reducer 
        }))
    }

    useEffect(() => {
        setPath(location.pathname)
    }, [])

    return (
        <section className="add-ons-wrap">
            <h1 className="title">Add ons</h1>
            <div>
                <input
                    id="first-plan"
                    type="checkbox"
                    name="online-services"
                    checked={form["add-ons"]["online-services"]}
                    onChange={handleClick}
                />
                <label for="first-plan">
                    <div>
                        <div>Online Service</div>
                        <div>Access to multplayer games</div>
                    </div>
                    {!form["yearly"] && <span>+$1/mo</span>}
                    {form["yearly"] && <span>+$12/yr</span>}
                </label>
            </div>
            <div>
                <input
                    id="second-plan"
                    type="checkbox"
                    name="larger-storage"
                    checked={form["add-ons"]["larger-storage"]}
                    onChange={handleClick}
                />
                <label for="second-plan">
                    <div>
                        <div>Larger Storage</div>
                        <div>Extra 1TB of cloud save</div>
                    </div>
                    {!form["yearly"] && <span>+$2/mo</span>}
                    {form["yearly"] && <span>+$24/yr</span>}
                </label>
            </div>
            <div>
                <input
                    id="third-plan"
                    type="checkbox"
                    name="customizable-profile"
                    checked={form["add-ons"]["customizable-profile"]}
                    onChange={handleClick}
                />
                <label for="third-plan">
                    <div>
                        <div>Customizable Profile</div>
                        <div>Custom theme on your profile</div>
                    </div>
                    {!form["yearly"] && <span>+$2/mo</span>}
                    {form["yearly"] && <span>+$24/yr</span>}
                </label>
            </div>
            <span className="page-form-nav">
                <Link to="/UserPlan">
                    <button className="go-back" onClick={() => setPageNumber("2")}>Go Back</button>
                </Link>
                <Link to="/Summary">
                    <button className="buttonAdd-nextPage" onClick={() => setPageNumber("4")}>Next</button>
                </Link>
            </span>
        </section>
    )
}

export default AddOns