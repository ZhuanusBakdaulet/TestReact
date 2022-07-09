import React, {Component} from "react";
import TableSearch from "./TableSearch/TeableSearch";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import data from "bootstrap/js/src/dom/data";
class App extends  Component {
    state = {
        isLoading : true,
        data:[],
        search : ''
    }
    async componentDidMount() {
        const response = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
        const data = await  response.json()
        this.setState({
            isLoading : false,
            data,
        })
    }
     onSort = sortField =>{
        const copyData = this.state.data.concat();

        const data = copyData.sort(
            (a,b) => {return a[sortField] > b[sortField] ? 1 : -1}
        );
        this.setState({data, sortField })
    }

    searchHandler = search =>{
        this.setState({search})
        console.log(search)
    }
    getFilteredData(){
        const {data,search}  = this.state
        if(!search){
            return data
        }
        return data.filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
        })
    }
    render() {
        const filteredData = this.getFilteredData()
    return(

        <div className="container">
            {
                this.state.isLoading
                 ? <Loader/>
                    :<React.Fragment>
                    <TableSearch onSearch = {this.searchHandler}/>
                        <Table
                            data = {this.state.data}
                            onSort={this.onSort}
                        />
                    </React.Fragment>


            }
        </div>
    )

  }
}
export default App;
