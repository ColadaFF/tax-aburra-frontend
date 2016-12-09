import React, {Component} from 'react';

class TestComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <form>
                <div>
                    <input type="text" className="textField"/>

                </div>
            </form>
        );
    }
}

export default TestComponent;