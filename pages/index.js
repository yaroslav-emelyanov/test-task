import List from "../components/List";
import Search from "../components/Search";
import Form from "../components/Form";

function Index () {
    return (
        <div className="container w-75 mt-5 pt-5">
            <div className="row">
                <div className="col-5">
                    <List/>
                </div>
                <div className="col-7">
                    <Search/>
                    <Form/>
                </div>
            </div>
        </div>
  )
}

export default Index;