const initialState={
    data:{}
}

export default function RootReducer(state=initialState,action){
 
        switch(action.type){
            case 'ADD_PRODUCT':
                state.data[action.payload[0]] = action.payload[1]
                console.log('Data:',state.data)
                return {data:state.data}  
              
            case 'DELETE_PRODUCT':
                delete state.data[action.payload[0]]
                console.log('Data:',state.data)
                return {data:state.data}        
            
            default :
                return {data:state.data}    
        }
    
}