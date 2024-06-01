const initialState={
    data:{},
    user:{}
}

export default function RootReducer(state=initialState,action){
 
        switch(action.type){
            case 'ADD_USER':
                state.user[action.payload[0]] = action.payload[1]
                console.log('User:',state.user)
                return {data:state.data,user:state.user}
                
            case 'ADD_PRODUCT':
                state.data[action.payload[0]] = action.payload[1]
                console.log('Data:',state.data)
                return {data:state.data,user:state.user}  
              
            case 'DELETE_PRODUCT':
                delete state.data[action.payload[0]]
                console.log('Data:',state.data)
                return {data:state.data,user:state.user}        
            
            default :
                return {data:state.data,user:state.user}    
        }
    
}