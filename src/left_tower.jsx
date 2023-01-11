import React from 'react';

const LeftTower = ({ldisks}) => {
    return(
    <div>
        {ldisks.map((element, index) =>{
            return(
                <div key = {index}>
                    <li>{element}</li>
                </div>
            )
        })}
    </div>
    )
}

export default LeftTower;